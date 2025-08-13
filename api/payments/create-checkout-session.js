import { setCors } from '../_util-cors.js';
import { connectDB } from '../_db.js';
import jwt from 'jsonwebtoken';
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

  try {
    await connectDB();

    // Get token from header
    const token = req.headers['x-auth-token'] || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server misconfigured: JWT_SECRET missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { plan } = req.body; // 'basic', 'pro', or 'enterprise'

    if (!plan || !['basic', 'pro', 'enterprise'].includes(plan)) {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Plan pricing (in cents)
    const prices = {
      basic: 1900,     // $19.00/month
      pro: 3900,       // $39.00/month
      enterprise: 7900 // $79.00/month
    };

    const planNames = {
      basic: 'Basic Plan',
      pro: 'Pro Plan', 
      enterprise: 'Enterprise Plan'
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `ReviewReady ${planNames[plan]}`,
              description: `Monthly subscription for ${plan} review monitoring`,
              images: [`${process.env.CLIENT_URL || 'https://reviewready.ca'}/Review-Ready-logo.png`]
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
      success_url: `${process.env.CLIENT_URL || 'https://reviewready.ca'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'https://reviewready.ca'}/pricing`,
      metadata: {
        userId: user._id.toString(),
        plan: plan
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required'
    });

    res.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    res.status(500).json({ 
      message: 'Payment processing error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
