import { setCors } from './_util-cors.js';

export default function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    // No authentication required for testing
    try {
      const connectors = [
        {
          id: 'google',
          name: 'Google Business Profile',
          enabled: true,
          connected: false
        },
        {
          id: 'facebook',
          name: 'Facebook Page',
          enabled: true,
          connected: false
        },
        {
          id: 'yelp',
          name: 'Yelp Business',
          enabled: true,
          connected: false
        }
      ];

      return res.status(200).json(connectors);
    } catch (error) {
      console.error('Error fetching connectors:', error);
      return res.status(500).json({ error: 'Failed to fetch connectors' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
