const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
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
  connectedPlatforms: [{
    platform: {
      type: String,
      enum: ['google', 'yelp', 'facebook']
    },
    businessId: String,
    accessToken: String,
    refreshToken: String,
    connectedAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastReviewCheck: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
