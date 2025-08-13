// api/_db.js
import mongoose from "mongoose";

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

let isConnected = false;

async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is required');
  }
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || 'reviewready',
      bufferCommands: false,
    }).then(m => m.connection);
  }
  
  console.log('✅ MongoDB connected successfully');
  return mongoose.connection;
}

module.exports = { connectDB };
