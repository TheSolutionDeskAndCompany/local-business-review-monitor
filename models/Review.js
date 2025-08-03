const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['google', 'yelp', 'facebook'],
    required: true
  },
  platformReviewId: {
    type: String,
    required: true
  },
  reviewerName: {
    type: String,
    required: true
  },
  reviewerAvatar: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    default: ''
  },
  reviewDate: {
    type: Date,
    required: true
  },
  response: {
    text: String,
    respondedAt: Date,
    respondedBy: String
  },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral'
  },
  isNew: {
    type: Boolean,
    default: true
  },
  notificationSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate reviews
ReviewSchema.index({ userId: 1, platform: 1, platformReviewId: 1 }, { unique: true });

// Index for efficient queries
ReviewSchema.index({ userId: 1, createdAt: -1 });
ReviewSchema.index({ userId: 1, isNew: 1 });

module.exports = mongoose.model('Review', ReviewSchema);
