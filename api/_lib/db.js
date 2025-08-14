// api/_lib/db.js
import { Pool } from 'pg';

let pool = null;
export function getPool() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!pool) {
    pool = new Pool({ connectionString: url, max: 3, idleTimeoutMillis: 10000 });
  }
  return pool;
}

export async function query(sql, params = []) {
  const p = getPool();
  if (!p) return null;
  const res = await p.query(sql, params);
  return res;
}
