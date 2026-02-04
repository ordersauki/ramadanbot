import sql from '../../lib/db';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return Response.json({ error: 'Email and name required' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      const token = jwt.sign({ userId: existingUser[0].id }, process.env.JWT_SECRET!);
      return Response.json({ user: existingUser[0], token });
    }

    // Create user
    const user = await sql`
      INSERT INTO users (email, name, isPremium, createdAt, lastActivity, flyerCount)
      VALUES (${email}, ${name}, false, NOW(), NOW(), 0)
      RETURNING *
    `;

    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET!);

    return Response.json({ user: user[0], token });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}