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

// Connect Yelp Business
router.post('/connect/yelp', auth, async (req, res) => {
  try {
    const { businessId, apiKey } = req.body;
    
    if (!businessId || !apiKey) {
      return res.status(400).json({ message: 'Business ID and API key are required' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Remove existing Yelp connection if any
    user.connectedPlatforms = user.connectedPlatforms.filter(
      platform => platform.platform !== 'yelp'
    );
    
    // Test the connection first
    try {
      const response = await axios.get(`https://api.yelp.com/v3/businesses/${businessId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (response.data) {
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
          businessName: response.data.name
        });
      }
    } catch (apiError) {
      return res.status(400).json({ 
        message: 'Failed to connect to Yelp. Please check your Business ID and API key.',
        error: apiError.response?.data?.error?.description || 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Connect Facebook Page
router.post('/connect/facebook', auth, async (req, res) => {
  try {
    const { pageId, accessToken } = req.body;
    
    if (!pageId || !accessToken) {
      return res.status(400).json({ message: 'Page ID and access token are required' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Remove existing Facebook connection if any
    user.connectedPlatforms = user.connectedPlatforms.filter(
      platform => platform.platform !== 'facebook'
    );
    
    // Test the connection first
    try {
      const response = await axios.get(`https://graph.facebook.com/v18.0/${pageId}`, {
        params: {
          fields: 'name,category,location',
          access_token: accessToken
        }
      });
      
      if (response.data) {
        // Add new Facebook connection
        user.connectedPlatforms.push({
          platform: 'facebook',
          businessId: pageId,
          accessToken,
          connectedAt: new Date()
        });
        
        await user.save();
        
        res.json({ 
          message: 'Facebook Page connected successfully',
          businessName: response.data.name
        });
      }
    } catch (apiError) {
      return res.status(400).json({ 
        message: 'Failed to connect to Facebook. Please check your Page ID and access token.',
        error: apiError.response?.data?.error?.message || 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Disconnect platform
router.post('/disconnect/:platform', auth, async (req, res) => {
  try {
    const { platform } = req.params;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the platform connection
    const initialLength = user.connectedPlatforms.length;
    user.connectedPlatforms = user.connectedPlatforms.filter(
      p => p.platform !== platform
    );

    if (user.connectedPlatforms.length === initialLength) {
      return res.status(404).json({ message: 'Platform connection not found' });
    }

    await user.save();

    res.json({ 
      message: `${platform} disconnected successfully`,
      platform 
    });
  } catch (error) {
    console.error('Disconnect error:', error);
    res.status(500).json({ message: 'Failed to disconnect platform' });
  }
});

// Test Yelp connection
router.get('/test/yelp', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const yelpConnection = user.connectedPlatforms.find(
      platform => platform.platform === 'yelp'
    );
    
    if (!yelpConnection) {
      return res.status(400).json({ message: 'Yelp Business not connected' });
    }
    
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/${yelpConnection.businessId}`,
      {
        headers: {
          'Authorization': `Bearer ${yelpConnection.accessToken}`
        }
      }
    );
    
    res.json({ 
      message: 'Connection successful',
      businessInfo: {
        name: response.data.name,
        rating: response.data.rating,
        review_count: response.data.review_count
      }
    });
  } catch (error) {
    console.error('Yelp API test error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Connection test failed',
      error: error.response?.data?.error?.description || error.message
    });
  }
});

// Test Facebook connection
router.get('/test/facebook', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const facebookConnection = user.connectedPlatforms.find(
      platform => platform.platform === 'facebook'
    );
    
    if (!facebookConnection) {
      return res.status(400).json({ message: 'Facebook Page not connected' });
    }
    
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${facebookConnection.businessId}`,
      {
        params: {
          fields: 'name,category,rating_count,overall_star_rating',
          access_token: facebookConnection.accessToken
        }
      }
    );
    
    res.json({ 
      message: 'Connection successful',
      businessInfo: {
        name: response.data.name,
        category: response.data.category,
        rating_count: response.data.rating_count,
        overall_rating: response.data.overall_star_rating
      }
    });
  } catch (error) {
    console.error('Facebook API test error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Connection test failed',
      error: error.response?.data?.error?.message || error.message
    });
  }
});

module.exports = router;
