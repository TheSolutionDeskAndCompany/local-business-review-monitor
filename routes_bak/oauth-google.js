const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

const clientId = process.env.OAUTH_GOOGLE_CLIENT_ID;
const clientSecret = process.env.OAUTH_GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.OAUTH_GOOGLE_REDIRECT_URI;

// Scopes for Google Business Profile API
const scope = [
  'https://www.googleapis.com/auth/business.manage',
  'openid',
  'email',
  'profile'
].join(' ');

function makeState() {
  return crypto.randomBytes(16).toString('hex');
}

// GET /api/oauth/google/start - Initiate Google OAuth flow
router.get('/start', auth, (req, res) => {
  try {
    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).json({ message: 'Google OAuth not configured' });
    }

    const state = makeState();
    const returnTo = req.query.return_to || '/dashboard';
    
    // Store state and return_to in session/cookies for security
    res.cookie('oauth_state', state, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
      path: '/',
      maxAge: 10 * 60 * 1000 // 10 minutes
    });
    
    res.cookie('return_to', String(returnTo), { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
      path: '/',
      maxAge: 10 * 60 * 1000 // 10 minutes
    });

    // Store user ID for callback
    res.cookie('user_id', req.user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 10 * 60 * 1000 // 10 minutes
    });

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('state', state);

    res.redirect(authUrl.toString());
  } catch (error) {
    console.error('Google OAuth start error:', error);
    res.redirect('/dashboard?error=oauth_start_failed');
  }
});

// GET /api/oauth/google/callback - Handle Google OAuth callback
router.get('/callback', async (req, res) => {
  try {
    const { code, state, error } = req.query;
    const returnTo = req.cookies.return_to || '/dashboard';
    
    // Clear cookies
    res.clearCookie('oauth_state');
    res.clearCookie('return_to');
    const userId = req.cookies.user_id;
    res.clearCookie('user_id');

    if (error) {
      console.error('Google OAuth error:', error);
      return res.redirect(`${returnTo}?error=oauth_denied`);
    }

    if (!code || !state || state !== req.cookies.oauth_state) {
      return res.redirect(`${returnTo}?error=invalid_state`);
    }

    if (!userId) {
      return res.redirect(`${returnTo}?error=session_expired`);
    }

    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Get user profile
    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    const profile = profileResponse.data;

    // Save connection to database
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect(`${returnTo}?error=user_not_found`);
    }

    // Remove existing Google connection if any
    user.connectedPlatforms = user.connectedPlatforms.filter(
      platform => platform.platform !== 'google'
    );

    // Add new Google connection
    user.connectedPlatforms.push({
      platform: 'google',
      businessId: profile.email, // Use email as identifier
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt: new Date(Date.now() + expires_in * 1000),
      connectedAt: new Date(),
      profileData: {
        email: profile.email,
        name: profile.name,
        picture: profile.picture
      }
    });

    await user.save();

    res.redirect(`${returnTo}?connected=google`);
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    const returnTo = req.cookies.return_to || '/dashboard';
    res.clearCookie('oauth_state');
    res.clearCookie('return_to');
    res.clearCookie('user_id');
    res.redirect(`${returnTo}?error=oauth_failed`);
  }
});

module.exports = router;
