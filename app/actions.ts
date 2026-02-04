'use server';

import pool, { safeUser } from '../lib/db';
import { User, AnalyticsData } from '../types';
import { SignJWT } from 'jose';
import { differenceInCalendarDays, isSameDay } from 'date-fns';
import { generateMessage } from '../lib/gemini';
import { createHash } from 'crypto';

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-change-me');

// --- UTILS ---

const hashPin = (pin: string) => {
  return createHash('sha256').update(pin).digest('hex');
};

// --- AUTHENTICATION ---

export async function loginUser(name: string, pin: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const client = await pool.connect();
  try {
    const hashedPin = hashPin(pin);
    
    // Check if user exists
    const res = await client.query('SELECT * FROM users WHERE lower(name) = lower($1)', [name]);
    
    if (res.rows.length > 0) {
      const user = res.rows[0];
      if (user.pin_hash !== hashedPin) {
        return { success: false, error: "Incorrect PIN." };
      }
      if (user.is_banned) {
        return { success: false, error: "Account suspended." };
      }

      // Update Login Time
      const updated = await client.query(
        'UPDATE users SET last_login = NOW() WHERE id = $1 RETURNING *',
        [user.id]
      );
      return { success: true, user: safeUser(updated.rows[0]) };
    } else {
      // Create New User
      const newUser = await client.query(
        `INSERT INTO users (name, pin_hash, role) VALUES ($1, $2, 'user') RETURNING *`,
        [name, hashedPin]
      );
      return { success: true, user: safeUser(newUser.rows[0]) };
    }
  } catch (e) {
    console.error("Login Error", e);
    return { success: false, error: "Database Connection Failed" };
  } finally {
    client.release();
  }
}

export async function adminLogin(password: string): Promise<{ success: boolean; token?: string }> {
  if (password === ADMIN_PASS) {
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(JWT_SECRET);
    return { success: true, token };
  }
  return { success: false };
}

// --- GENERATION LOGIC ---

export async function checkLimitAndGenerate(userId: string, topic: string, day: number, hint?: string) {
  const client = await pool.connect();
  try {
    // 1. Get User
    const userRes = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userRes.rows[0];
    
    if (!user) return { success: false, error: "User not found" };
    if (user.is_banned) return { success: false, error: "User is banned" };

    // 2. Check Rate Limit
    const limit = user.rate_limit_override || 1;
    const now = new Date();
    
    // Count generations today
    const countRes = await client.query(
      `SELECT COUNT(*) FROM generations 
       WHERE user_id = $1 AND created_at::date = CURRENT_DATE`, 
      [userId]
    );
    const usedToday = parseInt(countRes.rows[0].count);

    if (usedToday >= limit && user.role !== 'admin') {
      return { success: false, error: "Daily limit reached." };
    }

    // 3. Generate AI Content
    const aiRes = await generateMessage(topic, day, hint);
    if (!aiRes.success) return aiRes;

    // 4. Log Transaction
    await client.query('BEGIN');
    
    // Update User Streak
    let newStreak = user.streak;
    if (user.last_generation_date) {
        const lastDate = new Date(user.last_generation_date);
        const diff = differenceInCalendarDays(now, lastDate);
        if (diff === 1) newStreak++;
        else if (diff > 1) newStreak = 1;
    } else {
        newStreak = 1;
    }

    const updatedUser = await client.query(
      `UPDATE users SET 
        last_generation_date = NOW(), 
        generation_count = generation_count + 1,
        streak = $1
       WHERE id = $2 RETURNING *`,
      [newStreak, userId]
    );

    // Insert Generation Record
    await client.query(
      'INSERT INTO generations (user_id, topic) VALUES ($1, $2)',
      [userId, topic]
    );

    await client.query('COMMIT');

    return { success: true, text: aiRes.text, user: safeUser(updatedUser.rows[0]), error: undefined };

  } catch (e) {
    await client.query('ROLLBACK');
    console.error("Gen Error", e);
    return { success: false, error: "System Error" };
  } finally {
    client.release();
  }
}

// --- ADMIN FEATURES ---

export async function getAnalytics(): Promise<AnalyticsData> {
  const client = await pool.connect();
  try {
    const totalUsers = await client.query('SELECT COUNT(*) FROM users');
    const totalGens = await client.query('SELECT COUNT(*) FROM generations');
    const activeToday = await client.query('SELECT COUNT(DISTINCT user_id) FROM generations WHERE created_at::date = CURRENT_DATE');
    const bannedUsers = await client.query('SELECT COUNT(*) FROM users WHERE is_banned = true');
    
    const recent = await client.query(`
        SELECT g.id, g.topic, g.created_at, u.name as user_name 
        FROM generations g 
        JOIN users u ON g.user_id = u.id 
        ORDER BY g.created_at DESC LIMIT 10
    `);

    return {
      totalUsers: parseInt(totalUsers.rows[0].count),
      totalGenerations: parseInt(totalGens.rows[0].count),
      activeToday: parseInt(activeToday.rows[0].count),
      bannedUsers: parseInt(bannedUsers.rows[0].count),
      recentGenerations: recent.rows.map(r => ({
          ...r, 
          created_at: r.created_at.toISOString()
      }))
    };
  } finally {
    client.release();
  }
}

export async function fetchAllUsers() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users ORDER BY last_login DESC LIMIT 100');
    return res.rows.map(safeUser);
  } finally {
    client.release();
  }
}

export async function updateUserLimit(userId: string, newLimit: number) {
  const client = await pool.connect();
  try {
    await client.query('UPDATE users SET rate_limit_override = $1 WHERE id = $2', [newLimit, userId]);
    return { success: true };
  } catch(e) { return { success: false }; }
  finally { client.release(); }
}

export async function toggleUserBan(userId: string, status: boolean) {
  const client = await pool.connect();
  try {
    await client.query('UPDATE users SET is_banned = $1 WHERE id = $2', [status, userId]);
    return { success: true };
  } finally { client.release(); }
}