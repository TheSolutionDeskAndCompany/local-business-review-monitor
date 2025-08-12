export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // No authentication required for testing
    try {
      // Return sample reviews for testing (no database required)
      const sampleReviews = [
        {
          _id: '1',
          platform: 'Google',
          rating: 5,
          author: 'John Smith',
          text: 'Excellent service! Highly recommend.',
          date: new Date().toISOString(),
          replied: false,
          businessId: 'sample-business-1'
        },
        {
          _id: '2',
          platform: 'Google',
          rating: 4,
          author: 'Sarah Johnson',
          text: 'Great experience overall. Will come back again.',
          date: new Date(Date.now() - 86400000).toISOString(),
          replied: true,
          businessId: 'sample-business-1'
        },
        {
          _id: '3',
          platform: 'Facebook',
          rating: 3,
          author: 'Mike Davis',
          text: 'Good service but could be improved.',
          date: new Date(Date.now() - 172800000).toISOString(),
          replied: false,
          businessId: 'sample-business-1'
        }
      ];
      
      const limit = parseInt(req.query.limit) || 50;
      const limitedReviews = sampleReviews.slice(0, limit);

      return res.status(200).json({ 
        reviews: limitedReviews,
        total: sampleReviews.length,
        hasMore: sampleReviews.length > limit
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
