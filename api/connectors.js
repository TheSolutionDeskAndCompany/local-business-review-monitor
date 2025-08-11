export default function handler(req, res) {
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
          enabled: true,
          connected: false
        },
        {
          id: 'facebook',
          name: 'Facebook Page',
          enabled: true,
          connected: false
        },
        {
          id: 'yelp',
          name: 'Yelp Business',
          enabled: true,
          connected: false
        }
      ];

      return res.status(200).json(connectors);
    } catch (error) {
      console.error('Error fetching connectors:', error);
      return res.status(500).json({ error: 'Failed to fetch connectors' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
