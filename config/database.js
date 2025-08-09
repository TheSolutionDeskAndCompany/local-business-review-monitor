const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/review-monitor', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('MongoDB Connected', { host: conn.connection.host });
  } catch (error) {
    logger.warn('Database connection failed - running in development mode without database', { error: error.message });
    console.log('⚠️  MongoDB not available - password reset will work in development mode');
    // Don't exit the process - allow server to run without database for development
  }
};

module.exports = connectDB;
