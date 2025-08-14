const express = require('express');
const router = express.Router();

// GET /api/connectors - Returns list of available connectors based on environment variables
router.get('/', (req, res) => {
  try {
    const connectors = [
      {
        id: 'google',
        name: 'Google Business Profile',
        enabled: !!(process.env.OAUTH_GOOGLE_CLIENT_ID && 
                   process.env.OAUTH_GOOGLE_CLIENT_SECRET && 
                   process.env.OAUTH_GOOGLE_REDIRECT_URI)
      },
      {
        id: 'facebook',
        name: 'Facebook Page',
        enabled: !!(process.env.OAUTH_FACEBOOK_APP_ID && 
                   process.env.OAUTH_FACEBOOK_APP_SECRET && 
                   process.env.OAUTH_FACEBOOK_REDIRECT_URI)
      },
      {
        id: 'yelp',
        name: 'Yelp Business',
        enabled: !!process.env.YELP_API_KEY
      }
    ];

    res.json(connectors);
  } catch (error) {
    console.error('Error fetching connectors:', error);
    res.status(500).json({ message: 'Failed to fetch connectors' });
  }
});

module.exports = router;
