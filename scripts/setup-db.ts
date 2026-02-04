import sql from '../lib/db';

async function setupDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        isPremium BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT NOW(),
        lastActivity TIMESTAMP DEFAULT NOW(),
        flyerCount INTEGER DEFAULT 0
      )
    `;

    // Create payments table
    await sql`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        userId INTEGER REFERENCES users(id),
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'NGN',
        status VARCHAR(50) DEFAULT 'pending',
        flutterwaveRef VARCHAR(255),
        createdAt TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create admin_settings table
    await sql`
      CREATE TABLE IF NOT EXISTS adminSettings (
        id SERIAL PRIMARY KEY,
        premiumPrice DECIMAL(10,2) NOT NULL DEFAULT 1000.00,
        updatedAt TIMESTAMP DEFAULT NOW()
      )
    `;

    // Insert default admin settings if not exists
    await sql`
      INSERT INTO adminSettings (premiumPrice)
      VALUES (1000.00)
      ON CONFLICT DO NOTHING
    `;

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();