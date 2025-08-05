const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Registration attempt:', { email: req.body.email, hasPassword: !!req.body.password });
    console.log('Environment check:', { 
      hasMongoUri: !!process.env.MONGODB_URI, 
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV 
    });
    
    const { email, password, businessName, ownerName, phone } = req.body;

    // Validate required fields
    if (!email || !password || !businessName || !ownerName) {
      console.log('Missing required fields:', { email: !!email, password: !!password, businessName: !!businessName, ownerName: !!ownerName });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Checking for existing user...');
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('Creating new user...');
    // Create new user
    user = new User({
      email,
      password,
      businessName,
      ownerName,
      phone
    });

    console.log('Saving user to database...');
    await user.save();
    console.log('User saved successfully:', user.id);

    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    console.log('Creating JWT token...');
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err);
          return res.status(500).json({ message: 'Token generation failed' });
        }
        console.log('Registration successful for:', email);
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

module.exports = router;
