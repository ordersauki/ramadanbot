import sql from '../../lib/db';
import jwt from 'jsonwebtoken';
import Flutterwave from 'flutterwave-node-v3';

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

    // Get user
    const users = await sql`SELECT * FROM users WHERE id = ${auth.userId}`;
    if (users.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const user = users[0];
    if (user.ispremium) {
      return Response.json({ error: 'User is already premium' }, { status: 400 });
    }

    // Get premium price
    const settings = await sql`SELECT * FROM adminSettings LIMIT 1`;
    const premiumPrice = settings[0]?.premiumprice || 1000;

    // Initialize Flutterwave
    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY!,
      process.env.FLUTTERWAVE_SECRET_KEY!
    );

    // Create transfer account
    const payload = {
      account_bank: "044", // Access Bank
      account_number: "0690000031", // Test account
      amount: premiumPrice,
      currency: "NGN",
      email: user.email,
      tx_ref: `premium-${user.id}-${Date.now()}`,
      narration: `Premium upgrade for ${user.name}`
    };

    const response = await flw.Transfer.initiate(payload);

    if (response.status === 'success') {
      // Save payment record
      await sql`
        INSERT INTO payments (userId, amount, currency, status, flutterwaveRef)
        VALUES (${user.id}, ${premiumPrice}, 'NGN', 'pending', ${response.data.reference})
      `;

      return Response.json({
        success: true,
        accountNumber: response.data.account_number,
        bankName: response.data.bank_name,
        amount: premiumPrice,
        reference: response.data.reference
      });
    } else {
      return Response.json({ error: 'Failed to create payment account' }, { status: 500 });
    }

  } catch (error) {
    console.error('Payment initiation error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}