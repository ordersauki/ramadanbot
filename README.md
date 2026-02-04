# 🌙 Ramadan Bot - Daily Spiritual Flyer Generator

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Abdallahnangere/ramadanbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

*Generate beautiful, personalized Ramadan reflection flyers powered by AI*

[Live Demo](https://ramadanbot.vercel.app) • [Report Bug](https://github.com/Abdallahnangere/ramadanbot/issues) • [Request Feature](https://github.com/Abdallahnangere/ramadanbot/issues)

</div>

---

## ✨ Features

- 🤖 **AI-Powered Content**: Generate personalized spiritual messages using Google's Gemini AI
- 🎨 **Beautiful Flyers**: High-quality, mobile-optimized PNG flyers with Islamic design elements
- 📱 **iOS-Grade Experience**: Smooth animations, haptic feedback, and native-like interactions
- ⏰ **Daily Limit**: One flyer per day to encourage meaningful reflection
- 💾 **Persistent Storage**: Download your flyer again anytime during the day
- 📖 **Inspiring Verses**: Rotating Quranic verses for daily inspiration
- 🌙 **Ramadan-Themed**: Crescent moons, Islamic patterns, and spiritual color palette
- 📥 **Easy Sharing**: Download and share your reflections on social media

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key

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

   Add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:5173](http://localhost:5173)

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI**: Google Gemini API
- **Image Generation**: html2canvas
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📱 Usage

1. **Enter Your Details**: Provide your name, choose a topic, select the day of Ramadan
2. **Add Context**: Optionally include specific Ayah or Hadith references
3. **Generate**: Click "Generate Flyer" to create your personalized message
4. **Download**: Save your beautiful flyer as a high-resolution PNG
5. **Reflect**: Share with family and friends, or keep for personal contemplation

### Rate Limiting
- One flyer per day per device
- Resets at midnight local time
- Your flyer remains downloadable throughout the day

## 🎯 Key Components

### Core Features
- **RamadanForm**: Input form with validation and custom day selector
- **FlyerPreview**: Flyer generation and download interface
- **RateLimitMessage**: Daily limit screen with rotating verses
- **LoadingSpinner**: Smooth loading animations

### Utilities
- **flyerGenerator**: Converts HTML to high-res PNG using html2canvas
- **gemini**: AI integration for message generation
- **rateLimit**: Client-side rate limiting with localStorage

## 🔧 Configuration

### Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key
```

### Flyer Customization
Modify flyer dimensions and styling in `lib/flyerGenerator.ts`:
```typescript
const flyerConfig = {
  width: 1080,
  height: 1080, // Square format for WhatsApp stories
  // ... other options
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add `GEMINI_API_KEY` to environment variables
4. Deploy!

### Manual Deployment
```bash
npm run build
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the spiritual message generation
- **Islamic Design Elements** inspired by traditional Islamic art
- **Open Source Community** for the amazing tools and libraries

## 📞 Contact

**Abdallah Nangere**
- 📧 Email: abdallahnangere@gmail.com
- 📱 Phone: +234 816 413 5836

## 🔮 Future Enhancements

- [ ] Arabic language support
- [ ] Multiple flyer themes
- [ ] Social media integration
- [ ] Flyer history and favorites
- [ ] PWA offline capabilities
- [ ] Admin panel for content management

---

<div align="center">

**Made with ❤️ for the Ummah during Ramadan**

*May Allah accept our fasting and prayers. Ramadan Mubarak! 🌙*

</div>
