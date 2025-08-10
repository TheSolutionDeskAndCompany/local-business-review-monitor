// api/auth/register.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User Schema (inline for serverless)
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  subscription: {
    status: {
      type: String,
      enum: ['trial', 'active', 'cancelled', 'expired'],
      default: 'trial'
    },
    plan: {
      type: String,
      enum: ['basic', 'pro'],
      default: 'basic'
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    trialEndsAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    currentPeriodEnd: Date
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

let User;
try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', UserSchema);
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    await connectDB();
    
    const { email, password, businessName, ownerName, phone } = req.body;

    // Validate required fields
    if (!email || !password || !businessName || !ownerName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      email,
      password,
      businessName,
      ownerName,
      phone
    });

    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        businessName: user.businessName,
        ownerName: user.ownerName,
        phone: user.phone,
        subscription: user.subscription
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
