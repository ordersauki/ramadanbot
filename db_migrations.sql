-- Ramadan Bot Database Migrations
-- Run this script on Neon to ensure all required tables exist
-- Safe to run multiple times (uses IF NOT EXISTS)

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  pin_hash VARCHAR(64) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  streak INT DEFAULT 0,
  generation_count INT DEFAULT 0,
  last_login TIMESTAMPTZ DEFAULT NOW(),
  last_generation_date TIMESTAMPTZ,
  rate_limit_override INT DEFAULT 1,
  is_banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create generations table
CREATE TABLE IF NOT EXISTS generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login);
CREATE INDEX IF NOT EXISTS idx_users_name_lower ON users(LOWER(name));

-- Add any missing columns to existing users table (idempotent)
DO $$ 
BEGIN
  ALTER TABLE users ADD COLUMN IF NOT EXISTS streak INT DEFAULT 0;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS generation_count INT DEFAULT 0;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS last_generation_date TIMESTAMPTZ;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS rate_limit_override INT DEFAULT 1;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Optional: Create a view for user statistics (useful for admin dashboard)
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  u.id,
  u.name,
  u.streak,
  u.generation_count,
  COUNT(g.id) as total_generations,
  COUNT(CASE WHEN g.created_at::date = CURRENT_DATE THEN 1 END) as today_generations,
  u.rate_limit_override,
  u.is_banned,
  u.created_at,
  u.last_login
FROM users u
LEFT JOIN generations g ON u.id = g.user_id
GROUP BY u.id, u.name, u.streak, u.generation_count, u.rate_limit_override, u.is_banned, u.created_at, u.last_login;

-- Note: Tables and schema are preserved. This script only adds what's missing.
