import { setCors } from '../../_util-cors.js';
import { connectDB } from '../../_db.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import axios from 'axios';

// User Schema (inline for serverless)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String },
  connectedPlatforms: [{
    platform: { type: String, required: true },
    businessId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    connectedAt: { type: Date, default: Date.now }
  }],
  subscription: {
    plan: { type: String, default: 'free' },
    status: { type: String, default: 'trial' },
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
    const { businessId, apiKey } = req.body;

    if (!businessId || !apiKey) {
      return res.status(400).json({ message: 'Business ID and API key are required' });
    }

    // Validate Yelp credentials by making test API call
    try {
      const response = await axios.get(`https://api.yelp.com/v3/businesses/${businessId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!response.data || !response.data.id) {
        return res.status(400).json({ message: 'Invalid Yelp credentials or business not found' });
      }
    } catch (apiError) {
      console.error('Yelp API validation error:', apiError.response?.data);
      return res.status(400).json({ 
        message: 'Invalid Yelp credentials or business not accessible',
        details: apiError.response?.data?.error?.description || 'API validation failed'
      });
    }

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove existing Yelp connection if any
    user.connectedPlatforms = user.connectedPlatforms.filter(
      platform => platform.platform !== 'yelp'
    );

    // Add new Yelp connection
    user.connectedPlatforms.push({
      platform: 'yelp',
      businessId,
      accessToken: apiKey,
      connectedAt: new Date()
    });

    await user.save();

    res.json({ 
      message: 'Yelp Business connected successfully',
      platform: 'yelp',
      businessId,
      connectedAt: new Date()
    });
  } catch (error) {
    console.error('Yelp connection error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
