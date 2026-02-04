import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;

// User table
export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: Date;
  lastActivity: Date;
  flyerCount: number;
}

// Payment table
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  flutterwaveRef: string;
  createdAt: Date;
}

// Admin settings
export interface AdminSettings {
  id: string;
  premiumPrice: number;
  updatedAt: Date;
}