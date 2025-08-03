const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create checkout session
router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    const { plan } = req.body; // 'basic' or 'pro'
    const user = await User.findById(req.user.id);
    
    const prices = {
      basic: 1900, // $19.00 in cents
      pro: 3900    // $39.00 in cents
    };
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Review Monitor ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
              description: 'Monthly subscription for review monitoring'
            },
            unit_amount: prices[plan],
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
      metadata: {
        userId: user._id.toString(),
        plan: plan
      }
    });
    
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle successful payment
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const userId = session.metadata.userId;
        const plan = session.metadata.plan;
        
        // Get the subscription
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        
        // Update user subscription
        await User.findByIdAndUpdate(userId, {
          'subscription.status': 'active',
          'subscription.plan': plan,
          'subscription.stripeCustomerId': session.customer,
          'subscription.stripeSubscriptionId': session.subscription,
          'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
        });
        
        console.log(`Subscription activated for user ${userId}`);
        break;
        
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
          
          // Update subscription period
          await User.findOneAndUpdate(
            { 'subscription.stripeSubscriptionId': invoice.subscription },
            {
              'subscription.status': 'active',
              'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
            }
          );
        }
        break;
        
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        if (failedInvoice.subscription) {
          await User.findOneAndUpdate(
            { 'subscription.stripeSubscriptionId': failedInvoice.subscription },
            { 'subscription.status': 'expired' }
          );
        }
        break;
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        await User.findOneAndUpdate(
          { 'subscription.stripeSubscriptionId': deletedSubscription.id },
          { 'subscription.status': 'cancelled' }
        );
        break;
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get subscription status
router.get('/subscription', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('subscription');
    res.json(user.subscription);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Cancel subscription
router.post('/cancel-subscription', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.subscription.stripeSubscriptionId) {
      return res.status(400).json({ message: 'No active subscription found' });
    }
    
    await stripe.subscriptions.del(user.subscription.stripeSubscriptionId);
    
    user.subscription.status = 'cancelled';
    await user.save();
    
    res.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
