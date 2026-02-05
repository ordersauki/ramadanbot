import { NextRequest, NextResponse } from 'next/server';
import pool, { safeUser } from '../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      if (res.rows.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      const user = safeUser(res.rows[0]);
      return NextResponse.json({ user });
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('API /api/user error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
