// api/auth/register.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getDB } = require("../../lib/mongo");

async function readJSON(req) {
  if (req.body) return req.body;
  const chunks = [];
  for await (const ch of req) chunks.push(ch);
  try { return JSON.parse(Buffer.concat(chunks).toString() || "{}"); } catch { return {}; }
}

function bad(res, code, msg) { return res.status(code).json({ ok: false, error: msg }); }

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return bad(res, 405, "Method Not Allowed");

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { email, password, businessName, ownerName, phone } = await readJSON(req);

    // Validate required fields
    if (!email || !password || !businessName || !ownerName) {
      console.warn('Missing required fields', { email: !!email, password: !!password, businessName: !!businessName, ownerName: !!ownerName });
      return bad(res, 400, "Missing required fields");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return bad(res, 400, "Invalid email format");
    }

    // Validate password strength
    if (password.length < 8) {
      return bad(res, 400, "Password must be at least 8 characters long");
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return bad(res, 400, "Password must contain at least one uppercase letter, one lowercase letter, and one number");
    }

    const emailLower = email.toLowerCase();
    const db = await getDB();
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ 
      $or: [{ emailLower }, { email }] 
    });

    if (existingUser) {
      console.warn('User already exists', { email: emailLower });
      return bad(res, 400, "User already exists");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
      email,
      emailLower,
      passwordHash,
      businessName,
      ownerName,
      phone: phone || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      isEmailVerified: false,
      subscription: {
        plan: "trial",
        status: "active",
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        stripeCustomerId: null,
        stripeSubscriptionId: null
      },
      settings: {
        emailNotifications: true,
        smsNotifications: false,
        reviewAlerts: true
      }
    };

    console.log('Creating new user', { email: emailLower, businessName });
    const result = await users.insertOne(newUser);
    
    if (!result.insertedId) {
      console.error('Failed to create user');
      return bad(res, 500, "Failed to create user");
    }

    console.log('User registered successfully', { userId: result.insertedId, email: emailLower });

    // Create JWT token
    const payload = {
      user: {
        id: result.insertedId.toString()
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Return success response with token and user data
    const userResponse = {
      id: result.insertedId.toString(),
      email,
      businessName,
      ownerName,
      phone: phone || "",
      subscription: newUser.subscription,
      settings: newUser.settings
    };

    return res.status(201).json({
      ok: true,
      message: "User registered successfully",
      token,
      user: userResponse
    });

  } catch (error) {
    console.error("Registration error:", error);
    return bad(res, 500, "Server error");
  }
};
