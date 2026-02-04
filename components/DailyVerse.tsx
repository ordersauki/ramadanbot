import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Share2, Bookmark } from 'lucide-react';

interface DailyVerseProps {
  onClose?: () => void;
}

const dailyVerses = [
  {
    text: "Indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    reference: "Quran 94:5-6",
    theme: "Hope & Ease",
  },
  {
    text: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
    reference: "Quran 54:17",
    theme: "Quranic Guidance",
  },
  {
    text: "And your Lord says, 'Call upon Me; I will respond to you.'",
    reference: "Quran 40:60",
    theme: "Prayer & Response",
  },
  {
    text: "The most beloved of deeds to Allah are the most consistent, even if they are small.",
    reference: "Sahih Bukhari",
    theme: "Consistency",
  },
  {
    text: "Whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it.",
    reference: "Quran 99:7-8",
    theme: "Accountability",
  },
  {
    text: "And [mention, O Muhammad], when Abraham was tried by his Lord with commands and he fulfilled them.",
    reference: "Quran 2:124",
    theme: "Patience & Obedience",
  },
  {
    text: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    reference: "Quran 21:87",
    theme: "Repentance",
  },
  {
    text: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    reference: "Quran 2:152",
    theme: "Gratitude",
  },
  {
    text: "And in yourself. Then will you not see?",
    reference: "Quran 51:21",
    theme: "Self-Reflection",
  },
  {
    text: "It is not required of you to walk on water, but it is required of you to be truthful.",
    reference: "Sahih Bukhari",
    theme: "Truthfulness",
  },
];

const DailyVerse: React.FC<DailyVerseProps> = ({ onClose }) => {
  const [verse, setVerse] = useState(dailyVerses[0]);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    // Get a verse based on the current date (so it's consistent throughout the day)
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const verseIndex = dayOfYear % dailyVerses.length;
    setVerse(dailyVerses[verseIndex]);
  }, []);

  const handleCopy = () => {
    const text = `"${verse.text}" - ${verse.reference}\n\nTheme: ${verse.theme}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = `"${verse.text}" - ${verse.reference}\n\nGenerated with Ramadan Bot`;
    if (navigator.share) {
      navigator.share({
        title: 'Daily Quranic Verse',
        text: text,
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 rounded-2xl p-8 shadow-lg border border-amber-200 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 text-6xl opacity-10">📿</div>
      <div className="absolute bottom-0 left-0 text-6xl opacity-10">🌙</div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✨</span>
            <div>
              <h2 className="text-2xl font-bold text-amber-900">Daily Verse</h2>
              <p className="text-xs text-amber-700">Refresh your spirit daily</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-amber-700 hover:text-amber-900 font-bold text-xl">
              ✕
            </button>
          )}
        </div>

        {/* Theme tag */}
        <div className="mb-6">
          <span className="inline-block bg-amber-200 text-amber-900 text-xs font-bold px-4 py-1 rounded-full">
            📖 {verse.theme}
          </span>
        </div>

        {/* Verse text */}
        <blockquote className="mb-8">
          <p className="text-2xl font-semibold text-amber-950 leading-relaxed italic">
            "{verse.text}"
          </p>
        </blockquote>

        {/* Reference */}
        <div className="mb-8 pl-6 border-l-4 border-amber-400">
          <p className="text-lg font-bold text-amber-800">— {verse.reference}</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl font-semibold transition-all active:scale-95"
          >
            <Copy size={18} />
            {copied ? 'Copied!' : 'Copy Verse'}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition-all active:scale-95"
          >
            <Share2 size={18} />
            Share
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all active:scale-95 ${
              bookmarked
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-rose-100 hover:bg-rose-200 text-rose-700'
            }`}
          >
            <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>

        {/* Inspirational message */}
        <div className="mt-8 p-4 bg-white/50 rounded-xl border border-amber-200/50 backdrop-blur-sm">
          <p className="text-sm text-amber-900 font-semibold">
            💡 <strong>Spiritual Tip:</strong> Take a moment today to reflect deeply on this verse. Consider its meaning in your life and how you can apply it in your actions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyVerse;
