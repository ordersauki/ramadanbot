import React, { useState, useEffect } from 'react';
import { canGenerate, recordGeneration, getResetTime } from './lib/rateLimit';
import { GeneratedData } from './types';
import RamadanForm from './components/RamadanForm';
import FlyerPreview from './components/FlyerPreview';
import RateLimitMessage from './components/RateLimitMessage';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [canGen, setCanGen] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [resetTime, setResetTime] = useState<string>('');

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
    recordGeneration();
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
    <div className="h-[100dvh] flex flex-col bg-gradient-to-br from-[#fefce8] via-[#f0fdfa] to-[#fffbeb] text-gray-800 font-sans overflow-hidden">
      
      {/* Scrollable Container */}
      <div className="flex-1 flex flex-col overflow-y-auto w-full max-w-lg mx-auto px-4">
        
        {/* Compact Header */}
        <header className="pt-6 pb-2 text-center flex-shrink-0">
          <h1 className="text-3xl font-bold text-primary-800 tracking-tight drop-shadow-sm">
            🌙 Ramadan Bot
          </h1>
          <p className="text-sm text-gray-600 font-medium">
            Daily Spiritual Flyer Generator
          </p>
        </header>

        {/* Main Content - Centers vertically if space allows */}
        <main className="flex-1 flex flex-col justify-center py-2">
          {isChecking ? (
             <div className="flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" label="Checking availability..." />
             </div>
          ) : generatedData ? (
            <FlyerPreview 
              message={generatedData.text}
              formData={generatedData.formData}
              onReset={handleReset}
            />
          ) : canGen ? (
            <div className="w-full animate-fade-in-up">
              <RamadanForm onSuccess={handleSuccess} />
            </div>
          ) : (
            <RateLimitMessage resetTime={resetTime} />
          )}
        </main>

        {/* Compact Footer */}
        <footer className="py-4 flex-shrink-0 text-center border-t border-gray-200/50 mt-2">
          <div className="flex flex-col gap-1 items-center">
             <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Sponsored by <span className="font-bold text-primary-700">Abdallah Nangere 🇳🇬❤️</span></span>
             </div>
             <div className="flex gap-3 text-[10px] text-gray-400">
               <a href="tel:+2348164135836" className="hover:text-primary-600">📞 +234 816 413 5836</a>
               <span>•</span>
               <a href="mailto:abdallahnangere@gmail.com" className="hover:text-primary-600">📧 Email</a>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;