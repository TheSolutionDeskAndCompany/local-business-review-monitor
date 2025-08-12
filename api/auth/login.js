const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide both email and password' 
      });
    }

    let user = null;
    
    try {
      // Try to connect to database
      const client = await connectToDatabase();
      const db = client.db('reviewready');
      const users = db.collection('users');
      
      // Find user by email
      user = await users.findOne({ email: email.toLowerCase() });
    } catch (dbError) {
      console.log('Database connection failed, using fallback for development');
      
      // Fallback: Allow specific test credentials for development
      if (email.toLowerCase() === 'admin@thesolutiondesk.ca' && password === 'password123') {
        user = {
          _id: 'temp-user-id',
          email: 'admin@thesolutiondesk.ca',
          businessName: 'The Solution Desk',
          ownerName: 'Admin User',
          phone: '6049977345',
          subscription: {
            status: 'trial',
            plan: 'basic',
            trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          }
        };
      }
    }
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      email: user.email,
      businessName: user.businessName,
      ownerName: user.ownerName,
      phone: user.phone,
      subscription: user.subscription
    };

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
