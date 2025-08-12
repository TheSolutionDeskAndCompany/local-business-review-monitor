export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');

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
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    try {
      // Connect to database
      const { MongoClient } = require('mongodb');
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('reviewready');
      const reviews = db.collection('reviews');
      
      // Get user ID from token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
      const userId = decoded.userId;
      
      const limit = parseInt(req.query.limit) || 50;
      const skip = parseInt(req.query.skip) || 0;
      
      // Fetch reviews for the authenticated user's businesses
      const userReviews = await reviews.find({ userId })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      
      const total = await reviews.countDocuments({ userId });
      
      await client.close();

      return res.status(200).json({ 
        reviews: userReviews,
        total,
        hasMore: total > (skip + limit)
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
