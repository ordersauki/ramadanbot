import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { canGenerate, recordGeneration, getResetTime, getStoredFlyer } from './lib/rateLimit';
import { GeneratedData } from './types';
import RamadanForm from './components/RamadanForm';
import FlyerPreview from './components/FlyerPreview';
import RateLimitMessage from './components/RateLimitMessage';
import LoadingSpinner from './components/LoadingSpinner';
import AdminDashboard from './components/AdminDashboard';
import FlyerGallery from './components/FlyerGallery';
import { BarChart3, Image } from 'lucide-react';

const MainApp: React.FC = () => {
  const [canGen, setCanGen] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [resetTime, setResetTime] = useState<string>('');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const navigate = useNavigate();

  // Initial check
  useEffect(() => {
    const checkLimit = () => {
      const allowed = canGenerate();
      setCanGen(allowed);
      if (!allowed) {
        setResetTime(getResetTime());
      }
      setIsChecking(false);
    };

    checkLimit();
  }, []);

  const handleSuccess = (data: GeneratedData) => {
    setGeneratedData(data);
    // recordGeneration will be called when flyer is generated
  };

  const handleFlyerGenerated = (dataUrl: string, fileName: string) => {
    recordGeneration({
      dataUrl,
      fileName,
      formData: generatedData!.formData
    });
    setCanGen(false);
    setResetTime(getResetTime());
  };

  const handleReset = () => {
    setGeneratedData(null);
    // Note: canGen remains false because we recorded a generation. 
    // The user sees the flyer, then when they click "Back", they see the Rate Limit screen.
    // This enforces the 1 per day rule.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* iOS Style Header */}
      <header className="pt-safe-area-inset-top bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🌙</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Ramadan Bot</h1>
              <p className="text-sm text-gray-600">Daily Spiritual Flyer Generator</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setGalleryOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-600 px-3 py-2 rounded-lg font-medium transition-all text-sm"
              title="Flyer Gallery"
            >
              <Image size={18} />
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md"
              title="Admin Dashboard"
            >
              <BarChart3 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 py-6 pb-safe-area-inset-bottom">
        {isChecking ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <LoadingSpinner size="lg" label="Checking availability..." />
            </div>
          </div>
        ) : generatedData ? (
          <div className="flex-1">
            <FlyerPreview 
              message={generatedData.text}
              formData={generatedData.formData}
              onReset={handleReset}
              onFlyerGenerated={handleFlyerGenerated}
            />
          </div>
        ) : canGen ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
              <RamadanForm onSuccess={handleSuccess} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
              <RateLimitMessage resetTime={resetTime} />
            </div>
          </div>
        )}
      </main>

      {/* iOS Style Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 px-6 py-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Powered by</span>
            <span className="font-semibold text-teal-600">Ramadan Bot 🇳🇬❤️</span>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <button onClick={() => setGalleryOpen(true)} className="hover:text-purple-600 transition-colors sm:hidden">📸 Gallery</button>
            <button onClick={() => navigate('/admin')} className="hover:text-teal-600 transition-colors lg:hidden">📊 Admin</button>
            <span className="sm:hidden">•</span>
            <a href="https://github.com/Abdallahnangere/ramadanbot" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">🐙 GitHub</a>
          </div>
        </div>
      </footer>

      {/* Flyer Gallery Modal */}
      <FlyerGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;