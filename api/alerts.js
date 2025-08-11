export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Mock alerts data - replace with real DB queries
      const alerts = [
        {
          id: '1',
          type: 'low_rating',
          title: 'New 2-star review received',
          message: 'Customer left a 2-star review on Google Business Profile',
          platform: 'google',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false
        },
        {
          id: '2',
          type: 'response_needed',
          title: 'Review needs response',
          message: 'Review from 3 days ago still awaiting response',
          platform: 'yelp',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          read: true
        }
      ];

      res.json(alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      res.status(500).json({ message: 'Failed to fetch alerts' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
