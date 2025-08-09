const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const logger = require('../utils/logger');
const { sendPasswordResetEmail } = require('../services/emailService');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    logger.debug('Registration attempt', { email: req.body.email, hasPassword: !!req.body.password });
    logger.debug('Environment check', { 
      hasMongoUri: !!process.env.MONGODB_URI, 
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV 
    });
    
    const { email, password, businessName, ownerName, phone } = req.body;

    // Validate required fields
    if (!email || !password || !businessName || !ownerName) {
      logger.warn('Missing required fields', { email: !!email, password: !!password, businessName: !!businessName, ownerName: !!ownerName });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    logger.debug('Checking for existing user');
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      logger.warn('User already exists', { email });
      return res.status(400).json({ message: 'User already exists' });
    }

    logger.debug('Creating new user');
    // Create new user
    user = new User({
      email,
      password,
      businessName,
      ownerName,
      phone
    });

    logger.debug('Saving user to database');
    await user.save();
    logger.info('User registered successfully', { userId: user.id, email: user.email });

    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    logger.debug('Creating JWT token');
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          logger.error('JWT signing error', err);
          return res.status(500).json({ message: 'Token generation failed' });
        }
        logger.info('Registration completed', { email });
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            businessName: user.businessName,
            ownerName: user.ownerName,
            subscription: user.subscription
          }
        });
      }
    );
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            businessName: user.businessName,
            ownerName: user.ownerName,
            subscription: user.subscription
          }
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Generate reset link and send email
    const resetLink = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    logger.info('Password reset link generated', { email: user.email, resetLink });

    // Try to send password reset email, fallback to showing link if email not configured
    let emailSent = false;
    try {
      // Only attempt to send email if credentials are properly configured
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS && 
          !process.env.EMAIL_USER.includes('your-gmail') && 
          !process.env.EMAIL_PASS.includes('your-app-password')) {
        await sendPasswordResetEmail(user.email, resetLink);
        emailSent = true;
      }
    } catch (emailError) {
      logger.warn('Failed to send password reset email', { email: user.email, error: emailError.message });
    }

    res.json({ 
      message: emailSent 
        ? 'If an account with that email exists, a password reset link has been sent.'
        : 'Password reset link generated. Check console for development link.',
      // In development or when email fails, include the reset link
      ...((process.env.NODE_ENV === 'development' || !emailSent) && { resetLink })
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }

    // Verify reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Update password
    user.password = password;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
