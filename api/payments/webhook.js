import { setCors } from '../_util-cors.js';
import { connectDB } from '../_db.js';
import mongoose from 'mongoose';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// User Schema (inline for serverless)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String },
  subscription: {
    plan: { type: String, default: 'free' },
    status: { type: String, default: 'trial' },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    trialEndsAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    await connectDB();

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await handleCheckoutCompleted(session);
        break;
      
      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        await handleSubscriptionUpdated(updatedSubscription);
        break;
      
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        await handleSubscriptionDeleted(deletedSubscription);
        break;
      
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        await handlePaymentFailed(failedInvoice);
        break;
      
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleCheckoutCompleted(session) {
  const userId = session.metadata.userId;
  const plan = session.metadata.plan;
  
  const user = await User.findById(userId);
  if (!user) {
    console.error('User not found for checkout session:', userId);
    return;
  }

  // Update user subscription
  user.subscription = {
    plan: plan,
    status: 'active',
    stripeCustomerId: session.customer,
    stripeSubscriptionId: session.subscription,
    trialEndsAt: null
  };

  await user.save();
  console.log(`Subscription activated for user ${userId}, plan: ${plan}`);
}

async function handleSubscriptionUpdated(subscription) {
  const user = await User.findOne({ 
    'subscription.stripeSubscriptionId': subscription.id 
  });
  
  if (!user) {
    console.error('User not found for subscription:', subscription.id);
    return;
  }

  user.subscription.status = subscription.status;
  await user.save();
  console.log(`Subscription updated for user ${user._id}, status: ${subscription.status}`);
}

async function handleSubscriptionDeleted(subscription) {
  const user = await User.findOne({ 
    'subscription.stripeSubscriptionId': subscription.id 
  });
  
  if (!user) {
    console.error('User not found for deleted subscription:', subscription.id);
    return;
  }

  user.subscription = {
    plan: 'free',
    status: 'cancelled',
    stripeCustomerId: user.subscription.stripeCustomerId,
    stripeSubscriptionId: null,
    trialEndsAt: null
  };

  await user.save();
  console.log(`Subscription cancelled for user ${user._id}`);
}

async function handlePaymentFailed(invoice) {
  const user = await User.findOne({ 
    'subscription.stripeCustomerId': invoice.customer 
  });
  
  if (!user) {
    console.error('User not found for failed payment:', invoice.customer);
    return;
  }

  // Mark subscription as past_due
  user.subscription.status = 'past_due';
  await user.save();
  console.log(`Payment failed for user ${user._id}, marked as past_due`);
}
