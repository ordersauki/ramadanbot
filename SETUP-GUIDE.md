# Ramadan Bot Setup Guide

This comprehensive guide will help you set up the premium Ramadan Bot with database, payments, and admin panel.

## Prerequisites

- Node.js 18+
- Git
- Neon Database account (https://neon.tech)
- Flutterwave account (https://flutterwave.com)
- Vercel account (https://vercel.com)
- Google Gemini API key

## Step 1: Clone and Install

```bash
git clone https://github.com/Abdallahnangere/ramadanbot.git
cd ramadanbot
npm install
```

## Step 2: Set Up Neon Database

1. **Create Neon Account**: Sign up at https://neon.tech
2. **Create Project**: Create a new project
3. **Get Connection String**: Copy the connection string from the dashboard
4. **Run SQL Script**: Execute `database-init.sql` in the Neon SQL editor

## Step 3: Set Up Flutterwave

1. **Create Account**: Sign up at https://flutterwave.com
2. **Get API Keys**: Get your public and secret keys from the dashboard
3. **Configure Webhooks**: Set webhook URL to `https://yourdomain.com/api/webhook`

## Step 4: Configure Environment Variables

Create `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@host/db
JWT_SECRET=your_strong_random_jwt_secret
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_xxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_xxx
ADMIN_USER=admin
ADMIN_PASSWORD=your_secure_admin_password
```

## Step 5: Initialize Database

```bash
npm run setup-db
```

This runs the database setup script to create tables and initial data.

## Step 6: Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173 to see the app.

## Step 7: Test Features

1. **User Registration**: Register a new user
2. **Generate Flyer**: Create a flyer (free limit: 1/day)
3. **Premium Upgrade**: Test payment flow (use test credentials)
4. **Admin Panel**: Visit /admin with admin credentials

## Step 8: Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Complete premium Ramadan Bot setup"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Import your GitHub repo
   - Add all environment variables
   - Deploy

3. **Update Webhook URL**: In Flutterwave, update webhook to your Vercel domain

## Step 9: Configure Admin Settings

1. **Login to Admin Panel**: Go to `https://yourdomain.com/admin`
2. **Set Premium Price**: Update the subscription price
3. **Monitor Users**: View user activity and manage accounts

## Step 10: Go Live

- Test all features thoroughly
- Monitor logs in Vercel dashboard
- Set up monitoring for payments and user activity

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL format
- Check Neon project is active
- Ensure IP whitelist if needed

### Payment Issues
- Use Flutterwave test keys for development
- Verify webhook secret matches
- Check payment status in admin panel

### Admin Access
- Ensure ADMIN_USER and ADMIN_PASSWORD are set
- Check /admin route is accessible

### Flyer Generation
- Verify GEMINI_API_KEY is valid
- Check console for html2canvas errors
- Ensure premium badge shows for premium users

## Security Notes

- Never commit .env files
- Use strong JWT secrets
- Regularly rotate API keys
- Monitor admin access logs

## Support

For issues, check:
- Vercel function logs
- Neon database logs
- Flutterwave dashboard
- Browser console for frontend errors