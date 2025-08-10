// api/auth/register.js
export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password, businessName, ownerName, phone } = req.body;

    // Basic validation
    if (!email || !password || !businessName || !ownerName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // For now, return success to test the endpoint
    // TODO: Implement actual database operations
    const mockUser = {
      id: 'temp-' + Date.now(),
      email,
      businessName,
      ownerName,
      phone: phone || '',
      subscription: {
        status: 'trial',
        plan: 'basic',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    };

    const mockToken = 'temp-token-' + Date.now();

    return res.status(201).json({
      message: 'User registered successfully',
      token: mockToken,
      user: mockUser
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
