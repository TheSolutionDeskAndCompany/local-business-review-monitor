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
          enabled: true, // Always show Google for demo
          connected: false // TODO: Check DB for actual connection status
        },
        {
          id: 'facebook',
          name: 'Facebook Page',
          enabled: true, // Always show Facebook for demo
          connected: false
        },
        {
          id: 'yelp',
          name: 'Yelp Business',
          enabled: true, // Always show Yelp for demo
          connected: false
        }
      ];

      res.status(200).json(connectors);
    } catch (error) {
      console.error('Error fetching connectors:', error);
      res.status(500).json({ message: 'Failed to fetch connectors' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
