import React, { useEffect, useState } from 'react';
import { getRemainingTime } from '../lib/rateLimit';
import { Clock } from 'lucide-react';

interface RateLimitMessageProps {
  resetTime?: string;
}

const RateLimitMessage: React.FC<RateLimitMessageProps> = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    // Immediate check
    setTimeLeft(getRemainingTime());
    
    // Update every minute
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in p-2">
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-zinc-800">
        
        {/* Header */}
        <div className="bg-gray-100 dark:bg-zinc-800 p-8 text-center border-b border-gray-200 dark:border-zinc-700">
            <div className="text-5xl mb-4 animate-bounce">⏳</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Daily Limit Reached
            </h2>
        </div>
        
        <div className="p-8 text-center space-y-6">
          <div className="space-y-2">
             <p className="text-gray-600 dark:text-gray-400 text-sm">
              You have used your 1 generation for today.
              <br/>Please come back later.
            </p>
          </div>
            
          {/* Countdown Display */}
          <div className="inline-flex items-center gap-2 bg-ios-teal/10 text-ios-teal px-5 py-3 rounded-full font-mono font-bold text-lg border border-ios-teal/20">
            <Clock size={20} />
            <span>{timeLeft}</span>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-400 dark:text-gray-500">
                Ramadan Bot enforces this limit to ensure quality service for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitMessage;