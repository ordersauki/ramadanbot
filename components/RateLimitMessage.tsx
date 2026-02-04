import React, { useEffect, useState } from 'react';
import { getRemainingTime, getStoredFlyer } from '../lib/rateLimit';
import { downloadFlyer } from '../lib/flyerGenerator';
import { Download } from 'lucide-react';

interface RateLimitMessageProps {
  resetTime?: string;
}

const verses = [
  {
    text: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.",
    reference: "Quran 65:2-3"
  },
  {
    text: "Indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    reference: "Quran 94:5-6"
  },
  {
    text: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
    reference: "Quran 54:17"
  },
  {
    text: "And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive.",
    reference: "Quran 2:153"
  },
  {
    text: "Indeed, Allah is with the patient.",
    reference: "Quran 2:153"
  }
];

const RateLimitMessage: React.FC<RateLimitMessageProps> = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const storedFlyer = getStoredFlyer();

  useEffect(() => {
    setTimeLeft(getRemainingTime());
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 60000);

    // Cycle verses every 10 seconds
    const verseInterval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % verses.length);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(verseInterval);
    };
  }, []);

  const handleDownloadStored = () => {
    if (storedFlyer) {
      downloadFlyer(storedFlyer.dataUrl, storedFlyer.fileName);
    }
  };

  const currentVerse = verses[currentVerseIndex];

    <div className="w-full max-w-md mx-auto animate-fade-in p-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-200/50">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-center relative overflow-hidden">
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

          {storedFlyer && (
            <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200">
              <p className="text-teal-800 font-medium mb-3">Your today's flyer is ready to download again!</p>
              <button
                onClick={handleDownloadStored}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-150 active:scale-[0.98] flex items-center gap-2 mx-auto shadow-lg"
                onTouchStart={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate(50);
                  }
                }}
              >
                <Download size={18} />
                Download Again
              </button>
            </div>
          )}

          <blockquote className="bg-amber-50 p-4 rounded-2xl border-l-4 border-amber-400 italic text-gray-700 text-sm transition-all duration-500">
            "{currentVerse.text}"
            <footer className="text-amber-700 font-bold mt-2 not-italic text-xs">— {currentVerse.reference}</footer>
          </blockquote>

          <div className="pt-2">
            <p className="text-teal-600 font-medium">See you tomorrow, Insha'Allah! ❤️</p>
          </div>
        </div>
      </div>
    </div>
};

export default RateLimitMessage;