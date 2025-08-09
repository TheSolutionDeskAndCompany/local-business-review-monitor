// api/auth/me.js
const jwt = require("jsonwebtoken");
const { getDB } = require("../../lib/mongo");
const { ObjectId } = require("mongodb");

function bad(res, code, msg) { return res.status(code).json({ ok: false, error: msg }); }

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return bad(res, 405, "Method Not Allowed");

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

  try {
    // Get token from header
    const token = req.headers['x-auth-token'];
    
    if (!token) {
      return bad(res, 401, "No token, authorization denied");
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (error) {
      console.warn('Invalid token provided', { error: error.message });
      return bad(res, 401, "Token is not valid");
    }

    const userId = decoded.user?.id;
    if (!userId) {
      return bad(res, 401, "Invalid token payload");
    }

    const db = await getDB();
    const users = db.collection("users");

    // Find user by ID
    const user = await users.findOne({ _id: new ObjectId(userId) });
    
    if (!user) {
      console.warn('Token valid but user not found', { userId });
      return bad(res, 401, "User not found");
    }

    // Return user data (excluding sensitive information)
    const userResponse = {
      id: user._id.toString(),
      email: user.email,
      businessName: user.businessName,
      ownerName: user.ownerName,
      phone: user.phone || "",
      subscription: user.subscription || {
        plan: "trial",
        status: "active",
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      settings: user.settings || {
        emailNotifications: true,
        smsNotifications: false,
        reviewAlerts: true
      },
      createdAt: user.createdAt,
      isEmailVerified: user.isEmailVerified || false
    };

    return res.status(200).json(userResponse);

  } catch (error) {
    console.error("Auth verification error:", error);
    return bad(res, 500, "Server error");
  }
};
