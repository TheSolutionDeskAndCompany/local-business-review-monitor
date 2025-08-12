export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // No authentication required for testing
    try {
      // Return sample alerts for testing (no database required)
      const sampleAlerts = [
        {
          _id: '1',
          type: 'new_review',
          title: 'New 5-star review received',
          message: 'John Smith left a positive review on Google',
          severity: 'info',
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          type: 'low_rating',
          title: 'Low rating alert',
          message: 'Received a 2-star review that needs attention',
          severity: 'warning',
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          _id: '3',
          type: 'response_needed',
          title: 'Response needed',
          message: '3 reviews are waiting for your response',
          severity: 'medium',
          read: true,
          createdAt: new Date(Date.now() - 7200000).toISOString()
        }
      ];
      
      return res.status(200).json(sampleAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      res.status(500).json({ message: 'Failed to fetch alerts' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Remove the old mock implementation below
/*
    try {
      // Mock alerts data - replace with real DB queries
*/
