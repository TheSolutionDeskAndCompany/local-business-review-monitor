// api/auth/login.js
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
    const { email, password } = await readJSON(req);

    // Validate required fields
    if (!email || !password) {
      return bad(res, 400, "Email and password are required");
    }

    const emailLower = email.toLowerCase();
    const db = await getDB();
    const users = db.collection("users");

    // Find user by email (case-insensitive)
    const user = await users.findOne({ 
      $or: [{ emailLower }, { email }] 
    });

    if (!user) {
      console.warn('Login attempt with non-existent email', { email: emailLower });
      return bad(res, 400, "Invalid credentials");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.warn('Login attempt with wrong password', { email: emailLower });
      return bad(res, 400, "Invalid credentials");
    }

    console.log('User logged in successfully', { userId: user._id, email: emailLower });

    // Create JWT token
    const payload = {
      user: {
        id: user._id.toString()
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Return success response with token and user data
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
      }
    };

    return res.status(200).json({
      ok: true,
      message: "Login successful",
      token,
      user: userResponse
    });

  } catch (error) {
    console.error("Login error:", error);
    return bad(res, 500, "Server error");
  }
};
