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
      // Mock metrics data for dashboard KPI strip
      const metrics = {
        newReviews7d: 12,
        newReviews7dDelta: +3,
        avgRating30d: 4.3,
        avgRating30dDelta: +0.2,
        responseRate30d: 85,
        responseRate30dDelta: +5,
        avgResponseHours: 2.4,
        avgResponseHoursDelta: -0.5
      };

      return res.status(200).json(metrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      return res.status(500).json({ error: 'Failed to fetch metrics' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
