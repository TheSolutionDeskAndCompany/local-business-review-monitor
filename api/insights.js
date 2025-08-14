export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // No authentication required for testing
    try {
      // Return sample insights for testing (no database required)
      const insights = {
        volumeSeries: [
          { date: '2025-01-01', count: 5 },
          { date: '2025-01-02', count: 3 },
          { date: '2025-01-03', count: 8 },
          { date: '2025-01-04', count: 6 },
          { date: '2025-01-05', count: 12 },
          { date: '2025-01-06', count: 9 },
          { date: '2025-01-07', count: 15 }
        ],
        ratingSeries: [
          { date: '2025-01-01', rating: 4.2 },
          { date: '2025-01-02', rating: 4.1 },
          { date: '2025-01-03', rating: 4.4 },
          { date: '2025-01-04', rating: 4.3 },
          { date: '2025-01-05', rating: 4.5 },
          { date: '2025-01-06', rating: 4.2 },
          { date: '2025-01-07', rating: 4.3 }
        ],
        keywords: [
          { word: 'excellent service', count: 24 },
          { word: 'friendly staff', count: 18 },
          { word: 'quick response', count: 15 },
          { word: 'professional', count: 12 },
          { word: 'highly recommend', count: 10 }
        ],
        platformSplit: [
          { platform: 'Google', count: 45, percentage: 60 },
          { platform: 'Yelp', count: 20, percentage: 27 },
          { platform: 'Facebook', count: 10, percentage: 13 }
        ]
      };

      res.status(200).json(insights);
    } catch (error) {
      console.error('Error fetching insights:', error);
      res.status(500).json({ message: 'Failed to fetch insights' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
