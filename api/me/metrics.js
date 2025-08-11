export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Mock metrics data - replace with real DB queries
      const metrics = {
        newReviews7d: 12,
        avgRating30d: 4.3,
        responseRate30d: 85,
        avgResponseHours: 2.4,
        deltas: {
          newReviews7d: +3,
          avgRating30d: +0.2,
          responseRate30d: +5,
          avgResponseHours: -0.5
        }
      };

      res.json(metrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      res.status(500).json({ message: 'Failed to fetch metrics' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
