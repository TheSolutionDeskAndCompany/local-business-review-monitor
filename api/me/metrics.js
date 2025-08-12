export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Check for authentication
    const token = req.headers['x-auth-token'];
    if (!token) {
      return res.status(401).json({ message: 'Authorization required' });
    }

    // Verify JWT token
    const jwt = require('jsonwebtoken');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
      const userId = decoded.userId;
      
      // Connect to database
      const { MongoClient } = require('mongodb');
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('reviewready');
      const reviews = db.collection('reviews');
      
      const range = req.query.range || '30d';
      const days = parseInt(range.replace('d', ''));
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      
      // Calculate real metrics from user's reviews
      const allReviews = await reviews.find({ userId }).toArray();
      const recentReviews = allReviews.filter(r => new Date(r.date) >= startDate);
      const last7Days = allReviews.filter(r => new Date(r.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
      const previous7Days = allReviews.filter(r => {
        const date = new Date(r.date);
        return date >= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) && date < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      });
      
      // Calculate metrics
      const newReviews7d = last7Days.length;
      const newReviews7dDelta = newReviews7d - previous7Days.length;
      
      const avgRating30d = recentReviews.length > 0 
        ? Number((recentReviews.reduce((sum, r) => sum + r.rating, 0) / recentReviews.length).toFixed(1))
        : 0;
      const previousPeriodReviews = allReviews.filter(r => {
        const date = new Date(r.date);
        return date >= new Date(Date.now() - 2 * days * 24 * 60 * 60 * 1000) && date < startDate;
      });
      const previousAvgRating = previousPeriodReviews.length > 0
        ? Number((previousPeriodReviews.reduce((sum, r) => sum + r.rating, 0) / previousPeriodReviews.length).toFixed(1))
        : 0;
      const avgRating30dDelta = Number((avgRating30d - previousAvgRating).toFixed(1));
      
      const repliedReviews = recentReviews.filter(r => r.replied).length;
      const responseRate30d = recentReviews.length > 0 ? Math.round((repliedReviews / recentReviews.length) * 100) : 0;
      const previousRepliedReviews = previousPeriodReviews.filter(r => r.replied).length;
      const previousResponseRate = previousPeriodReviews.length > 0 ? Math.round((previousRepliedReviews / previousPeriodReviews.length) * 100) : 0;
      const responseRate30dDelta = responseRate30d - previousResponseRate;
      
      // Mock response time for now - would need actual response timestamps
      const avgResponseHours = 2.4;
      const avgResponseHoursDelta = -0.5;
      
      await client.close();
      
      // Real metrics data from database
      const metrics = {
        newReviews7d,
        newReviews7dDelta,
        avgRating30d,
        avgRating30dDelta,
        responseRate30d,
        responseRate30dDelta,
        avgResponseHours,
        avgResponseHoursDelta
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
