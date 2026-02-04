<<<<<<< HEAD
# 🌙 Ramadan Bot - Daily Spiritual Flyer Generator
=======
<div align="center">
<img width="1200" height="475" alt="Ramadan Bot Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🌙 Ramadan Bot - Premium Spiritual Flyer Generator
>>>>>>> f040f7d (Complete premium Ramadan Bot: iOS UI, database, payments, admin panel)

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Abdallahnangere/ramadanbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

*Generate beautiful, personalized Ramadan reflection flyers powered by AI - Premium Edition*

[Live Demo](https://ramadanbot.vercel.app) • [Report Bug](https://github.com/Abdallahnangere/ramadanbot/issues) • [Request Feature](https://github.com/Abdallahnangere/ramadanbot/issues)

</div>

---

## ✨ Features

- 🤖 **AI-Powered Content**: Generate personalized spiritual messages using Google's Gemini AI
- 🎨 **Premium Flyers**: High-quality PNG flyers with Islamic calligraphy, geometric patterns, and minaret silhouettes
- 👑 **Premium Users**: Generate up to 5 flyers per day with exclusive badge and enhanced design
- 💳 **Flutterwave Payments**: Secure bank transfer payments for premium upgrades
- 👨‍💼 **Admin Panel**: Complete user management, analytics, and pricing control
- 📱 **iOS-Grade Experience**: Smooth animations, glassmorphism, and native-like interactions
- ⏰ **Smart Rate Limiting**: User-based limits (1/day free, 5/day premium)
- 💾 **Persistent Storage**: Download flyers anytime with database tracking
- 📖 **Inspiring Verses**: Rotating Quranic verses for daily inspiration
- 🌙 **Ramadan-Themed**: Crescent moons, Islamic patterns, and spiritual color palette
- 📥 **Easy Sharing**: Download and share your reflections on social media

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key
- Neon Database account
- Flutterwave account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdallahnangere/ramadanbot.git
   cd ramadanbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure your environment:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   DATABASE_URL=your_neon_database_url
   JWT_SECRET=your_jwt_secret
   FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
   FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
   ADMIN_USER=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Initialize the database**
   ```bash
   npm run setup-db
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:5173](http://localhost:5173)

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, React Router
- **Backend**: Vercel Serverless Functions
- **Database**: Neon PostgreSQL
- **Payments**: Flutterwave
- **AI**: Google Gemini API
- **Image Generation**: html2canvas
- **Charts**: Recharts
- **Auth**: JWT
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📱 Usage

### For Users
1. **Register/Login**: Create account with email and name
2. **Enter Details**: Provide name, choose topic, select Ramadan day
3. **Add Context**: Optionally include specific Ayah or Hadith
4. **Generate**: Click "Generate Flyer" (respects daily limits)
5. **Upgrade to Premium**: Pay via Flutterwave for 5x daily limit and premium badge
6. **Download**: Save high-resolution PNG flyer

### For Admins
1. **Access /admin**: Login with admin credentials
2. **Manage Users**: View, search, upgrade/demote users, adjust limits
3. **Set Pricing**: Update premium subscription price
4. **Analytics**: View user stats, payment data, activity charts

### Rate Limiting
- **Free Users**: 1 flyer per day
- **Premium Users**: 5 flyers per day
- Resets at midnight UTC
- Database-tracked per user

## 🎯 Key Components

### Core Features
- **RamadanForm**: Input form with validation and custom day selector
- **FlyerPreview**: Premium flyer generation with Islamic elements
- **RateLimitMessage**: Daily limit screen with rotating verses
- **UserAuth**: Registration and login system
- **PaymentFlow**: Flutterwave integration for premium upgrades
- **AdminPanel**: Complete admin dashboard with analytics

### Utilities
- **flyerGenerator**: Premium flyer creation with calligraphy and patterns
- **gemini**: AI integration for spiritual message generation
- **db**: Neon database operations
- **auth**: JWT authentication middleware

## 🔧 Configuration

### Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@host/db
JWT_SECRET=strong_random_secret
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_xxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_xxx
ADMIN_USER=admin
ADMIN_PASSWORD=secure_password
```

### Database Schema
Run `database-init.sql` in your Neon console to set up tables.

### Flyer Customization
Modify flyer elements in `lib/flyerGenerator.ts` for premium features.

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add all environment variables
4. Run database setup script
5. Deploy!

### Manual Deployment
```bash
npm run build
npm run preview
```

## 🤝 Contributing

Contributions welcome! Follow standard Git workflow.

## 📝 License

MIT License - see `LICENSE` for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for spiritual content
- **Islamic Design Elements** from traditional art
- **Open Source Community** for amazing tools

## 📞 Contact

**Abdallah Nangere**
- 📧 Email: abdallahnangere@gmail.com
- 📱 Phone: +234 816 413 5836

## 🔮 Future Enhancements

- [x] Premium user system
- [x] Payment integration
- [x] Admin panel
- [x] Database backend
- [ ] Arabic language support
- [ ] Multiple flyer themes
- [ ] PWA offline capabilities

---

<div align="center">

**Made with ❤️ for the Ummah during Ramadan**

*May Allah accept our fasting and prayers. Ramadan Mubarak! 🌙*

</div>
