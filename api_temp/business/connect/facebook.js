const { setCors } = require( '../../_util-cors.js';
const { connectDB } = require( '../../_db.js';
const jwt = require( 'jsonwebtoken';
const mongoose = require( 'mongoose';
const axios = require( 'axios';

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

module.exports = async function handler(req, res) {
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
    const { pageId, accessToken } = req.body;

    if (!pageId || !accessToken) {
      return res.status(400).json({ message: 'Page ID and access token are required' });
    }

    // Validate Facebook credentials by making test API call
    try {
      const response = await axios.get(`https://graph.facebook.com/v18.0/${pageId}`, {
        params: {
          access_token: accessToken,
          fields: 'id,name,category'
        }
      });

      if (!response.data || !response.data.id) {
        return res.status(400).json({ message: 'Invalid Facebook credentials or page not found' });
      }
    } catch (apiError) {
      console.error('Facebook API validation error:', apiError.response?.data);
      return res.status(400).json({ 
        message: 'Invalid Facebook credentials or page not accessible',
        details: apiError.response?.data?.error?.message || 'API validation failed'
      });
    }

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove existing Facebook connection if any
    user.connectedPlatforms = user.connectedPlatforms.filter(
      platform => platform.platform !== 'facebook'
    );

    // Add new Facebook connection
    user.connectedPlatforms.push({
      platform: 'facebook',
      businessId: pageId,
      accessToken,
      connectedAt: new Date()
    });

    await user.save();

    res.json({ 
      message: 'Facebook Business connected successfully',
      platform: 'facebook',
      businessId: pageId,
      connectedAt: new Date()
    });
  } catch (error) {
    console.error('Facebook connection error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
