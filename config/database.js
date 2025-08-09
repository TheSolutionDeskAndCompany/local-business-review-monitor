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
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
