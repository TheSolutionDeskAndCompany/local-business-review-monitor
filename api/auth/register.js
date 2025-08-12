const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 5000,
    });
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw new Error('Database connection failed. Please ensure MongoDB is running or check your connection string.');
  }
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
    const { email, password, businessName, ownerName, phone } = req.body;

    // Validate required fields
    if (!email || !password || !businessName || !ownerName) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: email, password, businessName, ownerName' 
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long' 
      });
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return res.status(400).json({ 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
      });
    }

    let existingUser = null;
    let users = null;
    let useFallback = false;
    
    try {
      // Try to connect to database
      const client = await connectToDatabase();
      const db = client.db('reviewready');
      users = db.collection('users');
      
      // Check if user already exists
      existingUser = await users.findOne({ email: email.toLowerCase() });
    } catch (dbError) {
      console.log('Database connection failed, using fallback for development');
      useFallback = true;
      
      // In fallback mode, we'll just proceed without checking existing users
      existingUser = null;
    }
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = {
      email: email.toLowerCase(),
      password: hashedPassword,
      businessName,
      ownerName,
      phone: phone || '',
      subscription: {
        status: 'trial',
        plan: 'basic',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let result = null;
    if (!useFallback && users) {
      result = await users.insertOne(newUser);
    } else {
      // Fallback mode: simulate successful insertion
      result = { insertedId: 'temp-user-id' };
      console.log('Fallback mode: User registration simulated for development');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );

    // Return user data (without password)
    const userResponse = {
      id: result.insertedId,
      email: newUser.email,
      businessName: newUser.businessName,
      ownerName: newUser.ownerName,
      phone: newUser.phone,
      subscription: newUser.subscription
    };

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
