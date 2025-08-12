export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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
      const alerts = db.collection('alerts');
      
      // Fetch real alerts for the authenticated user
      const userAlerts = await alerts.find({ userId })
        .sort({ timestamp: -1 })
        .limit(50)
        .toArray();
      
      await client.close();
      
      res.status(200).json(userAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      res.status(500).json({ message: 'Failed to fetch alerts' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Remove the old mock implementation below
/*
    try {
      // Mock alerts data - replace with real DB queries
*/
