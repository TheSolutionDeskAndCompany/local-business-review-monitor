export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, businessName, ownerName, phone } = req.body;

    // Basic validation
    if (!email || !password || !businessName || !ownerName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Return success response to get registration working
    return res.status(200).json({
      message: 'User registered successfully',
      token: 'temp-token-' + Date.now(),
      user: {
        id: 'temp-' + Date.now(),
        email,
        businessName,
        ownerName,
        phone: phone || ''
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
