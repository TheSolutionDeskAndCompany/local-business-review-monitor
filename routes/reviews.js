const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all reviews for user
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, platform, isNew } = req.query;
    
    const query = { userId: req.user.id };
    
    if (platform) {
      query.platform = platform;
    }
    
    if (isNew !== undefined) {
      query.isNew = isNew === 'true';
    }
    
    const reviews = await Review.find(query)
      .sort({ reviewDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Review.countDocuments(query);
    
    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get review statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const stats = await Review.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          newReviews: {
            $sum: {
              $cond: [{ $eq: ['$isNew', true] }, 1, 0]
            }
          },
          positiveReviews: {
            $sum: {
              $cond: [{ $gte: ['$rating', 4] }, 1, 0]
            }
          },
          negativeReviews: {
            $sum: {
              $cond: [{ $lte: ['$rating', 2] }, 1, 0]
            }
          }
        }
      }
    ]);
    
    const platformStats = await Review.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: '$platform',
          count: { $sum: 1 },
          averageRating: { $avg: '$rating' }
        }
      }
    ]);
    
    const recentStats = await Review.aggregate([
      { 
        $match: { 
          userId: userId,
          reviewDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$reviewDate' }
          },
          count: { $sum: 1 },
          averageRating: { $avg: '$rating' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    
    res.json({
      overall: stats[0] || {
        totalReviews: 0,
        averageRating: 0,
        newReviews: 0,
        positiveReviews: 0,
        negativeReviews: 0
      },
      byPlatform: platformStats,
      recent: recentStats
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Mark review as read
router.patch('/:reviewId/read', auth, async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.reviewId, userId: req.user.id },
      { isNew: false },
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Mark all reviews as read
router.patch('/mark-all-read', auth, async (req, res) => {
  try {
    await Review.updateMany(
      { userId: req.user.id, isNew: true },
      { isNew: false }
    );
    
    res.json({ message: 'All reviews marked as read' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Export reviews
router.get('/export', auth, async (req, res) => {
  try {
    const { format = 'json', startDate, endDate } = req.query;
    
    const query = { userId: req.user.id };
    
    if (startDate || endDate) {
      query.reviewDate = {};
      if (startDate) query.reviewDate.$gte = new Date(startDate);
      if (endDate) query.reviewDate.$lte = new Date(endDate);
    }
    
    const reviews = await Review.find(query).sort({ reviewDate: -1 });
    
    if (format === 'csv') {
      const csvHeader = 'Date,Platform,Reviewer,Rating,Review Text,Response\n';
      const csvRows = reviews.map(review => {
        const date = review.reviewDate.toISOString().split('T')[0];
        const text = `"${(review.text || '').replace(/"/g, '""')}"`;
        const response = `"${(review.response?.text || '').replace(/"/g, '""')}"`;
        return `${date},${review.platform},${review.reviewerName},${review.rating},${text},${response}`;
      }).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=reviews.csv');
      res.send(csvHeader + csvRows);
    } else {
      res.json(reviews);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
