import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('sslmode=require') 
    ? { rejectUnauthorized: false } 
    : undefined
});

export default pool;

// Helper to sanitize User object for client
export const safeUser = (row: any) => ({
  id: row.id,
  name: row.name,
  role: row.role,
  streak: row.streak,
  generation_count: row.generation_count,
  last_login: row.last_login?.toISOString(),
  last_generation_date: row.last_generation_date?.toISOString() || null,
  rate_limit_override: row.rate_limit_override,
  is_banned: row.is_banned,
  created_at: row.created_at?.toISOString(),
});