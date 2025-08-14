// api/reviews.js
import { query } from './_lib/db';
import { withRateLimit } from './_lib/rate-limit';
import { ok, bad } from './_lib/http';

// Demo data to return when database is not available
const DEMO = [
  { 
    id: 'g-1', 
    source: 'google', 
    rating: 5, 
    author: 'A. Lee', 
    text: 'Fantastic service.', 
    posted_at: '2025-08-01T12:00:00Z', 
    responded: false 
  },
  { 
    id: 'g-2', 
    source: 'google', 
    rating: 4, 
    author: 'S. Tran', 
    text: 'Quick reply.',      
    posted_at: '2025-08-03T09:30:00Z', 
    responded: true 
  }
];

async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return bad(res, 'Method Not Allowed', 405);
  }

  try {
    // Parse and validate limit parameter
    const limit = Math.max(1, Math.min(parseInt(req.query.limit || '50', 10), 200));
    
    // Try to fetch from database if available
    if (query) {
      const result = await query(
        `SELECT id, source, rating, author, text, posted_at, responded 
         FROM reviews 
         ORDER BY posted_at DESC 
         LIMIT $1`, 
        [limit]
      );
      
      if (result?.rows?.length) {
        return ok(res, { 
          reviews: result.rows, 
          total: result.rowCount, 
          hasMore: result.rowCount >= limit 
        });
      }
    }
    
    // Fall back to demo data if no database or no results
    return ok(res, { 
      reviews: DEMO, 
      total: DEMO.length, 
      hasMore: false 
    });
    
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return bad(res, 'Failed to fetch reviews', 500);
  }
}

export default withRateLimit(handler, { max: 120 });
