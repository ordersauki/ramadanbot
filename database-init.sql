-- SQL Script to initialize the Neon database for Ramadan Bot

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  isPremium BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastActivity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  flyerCount INTEGER DEFAULT 0,
  dailyLimit INTEGER DEFAULT 1
);

-- Create payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'NGN',
  status VARCHAR(50) DEFAULT 'pending',
  flutterwaveRef VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin_settings table
CREATE TABLE admin_settings (
  id SERIAL PRIMARY KEY,
  premiumPrice DECIMAL(10,2) DEFAULT 5000.00,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin settings
INSERT INTO admin_settings (premiumPrice) VALUES (5000.00);

-- Create index for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_payments_userId ON payments(userId);
CREATE INDEX idx_payments_status ON payments(status);