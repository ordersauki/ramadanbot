-- Neon update script: set default daily limit to 3 and update existing rows
-- Paste this into Neon SQL editor and run.

BEGIN;

-- 1) Change default for new users
ALTER TABLE users ALTER COLUMN rate_limit_override SET DEFAULT 3;

-- 2) For safety, set NULLs to 3
UPDATE users SET rate_limit_override = 3 WHERE rate_limit_override IS NULL;

-- 3) Optionally raise any user limits below 3 up to 3
-- If you want EVERY user to have at least 3 per day, uncomment the following line:
UPDATE users SET rate_limit_override = 3 WHERE rate_limit_override < 3;

COMMIT;

-- Recommended: run a quick check
-- SELECT id, name, rate_limit_override FROM users ORDER BY name LIMIT 100;
