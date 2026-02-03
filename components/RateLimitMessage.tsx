import React, { useEffect, useState } from 'react';
import { getRemainingTime } from '../lib/rateLimit';

interface RateLimitMessageProps {
  resetTime?: string;
}

const RateLimitMessage: React.FC<RateLimitMessageProps> = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    setTimeLeft(getRemainingTime());
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary-100">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="text-6xl mb-4 relative z-10">🌙</div>
            <h2 className="text-2xl font-bold text-white relative z-10">
              Alhamdulillah!
            </h2>
        </div>
        
        <div className="p-8 text-center space-y-6">
          <div className="space-y-2">
             <p className="text-gray-700 font-medium text-lg">
              You've created your flyer for today!
            </p>
            <p className="text-gray-500 text-sm">
              Come back {timeLeft} for a new reflection.
            </p>
          </div>

          <blockquote className="bg-secondary-50 p-4 rounded-xl border-l-4 border-secondary-400 italic text-gray-700 text-sm">
            "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect."
            <footer className="text-secondary-700 font-bold mt-2 not-italic text-xs">— Quran 65:2-3</footer>
          </blockquote>

          <div className="pt-2">
            <p className="text-primary-600 font-medium">See you tomorrow, Insha'Allah! ❤️</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitMessage;