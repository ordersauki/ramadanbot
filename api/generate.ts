import sql from '../../lib/db';
import jwt from 'jsonwebtoken';
import { generateMessage } from '../../lib/gemini';

interface AuthUser {
  userId: string;
}

function authenticate(request: Request): AuthUser | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const auth = authenticate(request);
    if (!auth) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userName, topic, day, hint } = await request.json();

    if (!userName || !topic || !day) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get user and check rate limits
    const users = await sql`SELECT * FROM users WHERE id = ${auth.userId}`;
    if (users.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const user = users[0];
    const now = new Date();
    const lastActivity = new Date(user.lastactivity);
    const isSameDay = lastActivity.toDateString() === now.toDateString();

    // Check daily limits
    const dailyLimit = user.ispremium ? 5 : 1;
    if (isSameDay && user.flyercount >= dailyLimit) {
      return Response.json({
        error: 'Daily limit reached',
        limit: dailyLimit,
        isPremium: user.ispremium
      }, { status: 429 });
    }

    // Generate message
    const message = await generateMessage(userName, topic, day, hint);

    // Update user activity and count
    const newCount = isSameDay ? user.flyercount + 1 : 1;
    await sql`
      UPDATE users
      SET lastActivity = NOW(), flyerCount = ${newCount}
      WHERE id = ${auth.userId}
    `;

    return Response.json({
      success: true,
      text: message,
      isPremium: user.ispremium
    });

  } catch (error) {
    console.error('Generate error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}