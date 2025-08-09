const cron = require('node-cron');
const axios = require('axios');
const User = require('../models/User');
const Review = require('../models/Review');
const { sendReviewNotification } = require('./emailService');
const logger = require('../utils/logger');
const emailService = require('./emailService');

// Monitor reviews every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  logger.info('Starting review monitoring check');
  
  try {
    // Get all users with active subscriptions and connected platforms
    const users = await User.find({
      'subscription.status': { $in: ['trial', 'active'] },
      'connectedPlatforms.0': { $exists: true }
    });
    
    for (const user of users) {
      await checkUserReviews(user);
    }
    
    logger.info('Review monitoring completed', { userCount: users.length });
  } catch (error) {
    console.error('Review monitoring error:', error);
  }
});

async function checkUserReviews(user) {
  try {
    for (const platform of user.connectedPlatforms) {
      if (platform.platform === 'google') {
        await checkGoogleReviews(user, platform);
      }
      // Add other platforms here (Yelp, Facebook) when implemented
    }
    
    // Update last check time
    user.lastReviewCheck = new Date();
    await user.save();
  } catch (error) {
    console.error(`Error checking reviews for user ${user._id}:`, error);
  }
}

async function checkGoogleReviews(user, googlePlatform) {
  try {
    // Fetch reviews from Google Business Profile API
    const response = await axios.get(
      `https://mybusinessbusinessinformation.googleapis.com/v1/locations/${googlePlatform.businessId}/reviews`,
      {
        headers: {
          'Authorization': `Bearer ${googlePlatform.accessToken}`
        },
        params: {
          pageSize: 50,
          orderBy: 'updateTime desc'
        }
      }
    );
    
    const reviews = response.data.reviews || [];
    let newReviewsCount = 0;
    
    for (const googleReview of reviews) {
      // Check if review already exists
      const existingReview = await Review.findOne({
        userId: user._id,
        platform: 'google',
        platformReviewId: googleReview.name
      });
      
      if (!existingReview) {
        // Create new review record
        const review = new Review({
          userId: user._id,
          platform: 'google',
          platformReviewId: googleReview.name,
          reviewerName: googleReview.reviewer?.displayName || 'Anonymous',
          reviewerAvatar: googleReview.reviewer?.profilePhotoUrl,
          rating: googleReview.starRating,
          text: googleReview.comment || '',
          reviewDate: new Date(googleReview.createTime),
          sentiment: determineSentiment(googleReview.starRating, googleReview.comment),
          isNew: true,
          notificationSent: false
        });
        
        await review.save();
        newReviewsCount++;
        
        // Send notification if enabled
        if (user.notifications.email && !review.notificationSent) {
          await emailService.sendNewReviewNotification(user, review);
          review.notificationSent = true;
          await review.save();
        }
      }
    }
    
    if (newReviewsCount > 0) {
      logger.info('New Google reviews found', { userId: user._id, count: newReviewsCount });
    }
    
  } catch (error) {
    console.error('Google reviews fetch error:', error.response?.data || error.message);
    
    // If token expired, mark platform as needing reconnection
    if (error.response?.status === 401) {
      logger.warn('Google token expired', { userId: user._id });
      // Could implement token refresh logic here
    }
  }
}

function determineSentiment(rating, text) {
  if (rating >= 4) return 'positive';
  if (rating <= 2) return 'negative';
  return 'neutral';
}

// Manual trigger for testing
async function triggerReviewCheck(userId) {
  try {
    const user = await User.findById(userId);
    if (user) {
      await checkUserReviews(user);
      return { success: true, message: 'Review check completed' };
    }
    return { success: false, message: 'User not found' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

module.exports = {
  triggerReviewCheck
};
