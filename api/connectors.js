export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
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
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
