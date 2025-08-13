const { setCors } = require( '../../_util-cors.js';
const { connectDB } = require( '../../_db.js';
const jwt = require( 'jsonwebtoken';
const mongoose = require( 'mongoose';

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
    const { businessId, accessToken, refreshToken } = req.body;

    if (!businessId || !accessToken) {
      return res.status(400).json({ message: 'Business ID and access token are required' });
    }

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove existing Google connection if any
    user.connectedPlatforms = user.connectedPlatforms.filter(
      platform => platform.platform !== 'google'
    );

    // Add new Google connection
    user.connectedPlatforms.push({
      platform: 'google',
      businessId,
      accessToken,
      refreshToken,
      connectedAt: new Date()
    });

    await user.save();

    res.json({ 
      message: 'Google Business Profile connected successfully',
      platform: 'google',
      businessId,
      connectedAt: new Date()
    });
  } catch (error) {
    console.error('Google connection error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
