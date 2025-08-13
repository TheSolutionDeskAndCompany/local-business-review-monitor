import { setCors } from './_util-cors.js';

export default function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      // Config-driven platform list with proper metadata
      const availablePlatforms = [
        {
          id: 'google',
          name: 'Google Business Profile',
          description: 'Monitor Google Business Profile reviews and ratings',
          icon: 'google',
          color: '#4285f4',
          enabled: true,
          priority: 1,
          requiresAuth: true,
          authType: 'oauth2',
          features: ['reviews', 'ratings', 'responses', 'analytics'],
          connected: false // TODO: Check actual connection status from database
        },
        {
          id: 'yelp',
          name: 'Yelp Business',
          description: 'Track Yelp reviews and business metrics',
          icon: 'yelp',
          color: '#d32323',
          enabled: true,
          priority: 2,
          requiresAuth: true,
          authType: 'api_key',
          features: ['reviews', 'ratings', 'business_info'],
          connected: false // TODO: Check actual connection status from database
        },
        {
          id: 'facebook',
          name: 'Facebook Business',
          description: 'Monitor Facebook page reviews and recommendations',
          icon: 'facebook',
          color: '#1877f2',
          enabled: true,
          priority: 3,
          requiresAuth: true,
          authType: 'oauth2',
          features: ['reviews', 'recommendations', 'page_insights'],
          connected: false // TODO: Check actual connection status from database
        }
      ];

      // Sort by priority and filter enabled platforms
      const connectors = availablePlatforms
        .filter(platform => platform.enabled)
        .sort((a, b) => a.priority - b.priority);

      return res.status(200).json(connectors);
    } catch (error) {
      console.error('Error fetching connectors:', error);
      return res.status(500).json({ error: 'Failed to fetch connectors' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
