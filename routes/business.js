const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Connect Google Business Profile
router.post('/connect/google', auth, async (req, res) => {
  try {
    const { businessId, accessToken, refreshToken } = req.body;
    
    const user = await User.findById(req.user.id);
    
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
    
    res.json({ message: 'Google Business Profile connected successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get connected platforms
router.get('/platforms', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('connectedPlatforms');
    
    const platforms = user.connectedPlatforms.map(platform => ({
      platform: platform.platform,
      connectedAt: platform.connectedAt,
      businessId: platform.businessId
    }));
    
    res.json(platforms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Disconnect platform
router.delete('/disconnect/:platform', auth, async (req, res) => {
  try {
    const { platform } = req.params;
    
    const user = await User.findById(req.user.id);
    user.connectedPlatforms = user.connectedPlatforms.filter(
      p => p.platform !== platform
    );
    
    await user.save();
    
    res.json({ message: `${platform} disconnected successfully` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Test Google Business Profile connection
router.get('/test/google', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const googleConnection = user.connectedPlatforms.find(
      platform => platform.platform === 'google'
    );
    
    if (!googleConnection) {
      return res.status(400).json({ message: 'Google Business Profile not connected' });
    }
    
    // Test API call to Google Business Profile
    const response = await axios.get(
      `https://mybusinessbusinessinformation.googleapis.com/v1/locations/${googleConnection.businessId}`,
      {
        headers: {
          'Authorization': `Bearer ${googleConnection.accessToken}`
        }
      }
    );
    
    res.json({ 
      message: 'Connection successful',
      businessInfo: {
        name: response.data.title,
        address: response.data.storefrontAddress
      }
    });
  } catch (error) {
    console.error('Google API test error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Connection test failed',
      error: error.response?.data?.error?.message || error.message
    });
  }
});

module.exports = router;
