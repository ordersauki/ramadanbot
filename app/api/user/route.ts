import { NextRequest, NextResponse } from 'next/server';
import pool, { safeUser } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      if (res.rows.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      const userRaw = res.rows[0];
      const user = safeUser(userRaw);
      // Count today's generations for this user
      const countRes = await client.query(
        `SELECT COUNT(*) FROM generations WHERE user_id = $1 AND created_at >= (NOW() - INTERVAL '24 hours')`,
        [id]
      );
      const todayGenerations = parseInt(countRes.rows[0].count || '0');
      const limit = user.rate_limit_override || 3;
      const remaining = Math.max(0, limit - todayGenerations);
      return NextResponse.json({ user: { ...user, today_generations: todayGenerations, remaining, limit } });
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('API /api/user error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
