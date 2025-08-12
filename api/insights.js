export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
      
      // Aggregate real insights from user's reviews
      const userReviews = await reviews.find({ 
        userId, 
        date: { $gte: startDate } 
      }).toArray();
      
      // Generate volume series
      const volumeSeries = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const count = userReviews.filter(r => 
          new Date(r.date).toISOString().split('T')[0] === dateStr
        ).length;
        volumeSeries.push({ date: dateStr, count });
      }
      
      // Generate rating series
      const ratingSeries = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const dayReviews = userReviews.filter(r => 
          new Date(r.date).toISOString().split('T')[0] === dateStr
        );
        const avgRating = dayReviews.length > 0 
          ? dayReviews.reduce((sum, r) => sum + r.rating, 0) / dayReviews.length 
          : 0;
        ratingSeries.push({ date: dateStr, rating: Number(avgRating.toFixed(1)) });
      }
      
      // Extract keywords from review text
      const keywords = [];
      const wordCounts = {};
      userReviews.forEach(review => {
        if (review.text) {
          const words = review.text.toLowerCase()
            .replace(/[^a-z\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3);
          words.forEach(word => {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
          });
        }
      });
      
      Object.entries(wordCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([word, count]) => {
          keywords.push({ word, count });
        });
      
      // Platform split
      const platformCounts = {};
      userReviews.forEach(review => {
        const platform = review.platform || 'Unknown';
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
      });
      
      const total = userReviews.length;
      const platformSplit = Object.entries(platformCounts).map(([platform, count]) => ({
        platform,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }));
      
      await client.close();
      
      // Real insights data from database
      const insights = {
        volumeSeries,
        ratingSeries,
        keywords,
        platformSplit
      };

      res.status(200).json(insights);
    } catch (error) {
      console.error('Error fetching insights:', error);
      res.status(500).json({ message: 'Failed to fetch insights' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
