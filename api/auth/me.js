export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get token from header
    const token = req.headers['x-auth-token'];
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Return mock user data for testing
    return res.status(200).json({
      id: 'temp-user-id',
      email: 'test@example.com',
      businessName: 'Test Business',
      ownerName: 'Test Owner',
      phone: '',
      subscription: {
        status: 'trial',
        plan: 'basic',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

  } catch (error) {
    console.error('Auth verification error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
