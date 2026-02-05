import React, { useEffect, useState } from 'react';
import { FormData, User } from '../types';
import { generateFlyer, downloadFlyer, slugify } from '../lib/flyerGenerator';
import LoadingSpinner from './LoadingSpinner';
import { Download, Share2, RefreshCcw, Sparkles, XCircle, Clock, MessageCircle, Share } from 'lucide-react';

interface FlyerPreviewProps {
  message: string;
  formData: FormData;
  onReset: () => void;
  user: User;
  onDownloaded?: (url: string) => void;
}

const FlyerPreview: React.FC<FlyerPreviewProps> = ({ message, formData, onReset, user, onDownloaded }) => {
  const [flyerUrl, setFlyerUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [countdown, setCountdown] = useState<string>('00:00:00');

  useEffect(() => {
    let mounted = true;

    const createFlyer = async () => {
      setError(null);
      setIsGenerating(true);
      try {
        if (!message || !user.name) throw new Error("Missing data for generation");

        // 1080x1080 Square config
        const url = await generateFlyer({
          width: 1080,
          height: 1080,
          backgroundColor: '#0f766e',
          textColor: '#ffffff',
          userName: user.name,
          topic: formData.topic,
          day: formData.day,
          message: message
        });
        
        if (mounted) {
          if (!url || url.length < 100) throw new Error("Generated image is invalid");
          setFlyerUrl(url);
          setIsGenerating(false);
        }
      } catch (err: any) {
        if (mounted) {
          console.error("Preview Generation Error", err);
          console.error("Error details:", err.message || JSON.stringify(err));
          setError("Design render failed: " + (err.message || "Unknown error"));
          setIsGenerating(false);
        }
      }
    };
    
    const t = setTimeout(createFlyer, 500);
    return () => { 
        mounted = false; 
        clearTimeout(t);
    };
  }, [message, formData, user]);

  // Countdown Timer for Rate Limit
  useEffect(() => {
    if (!hasDownloaded || !user.last_generation_date) return;

    const interval = setInterval(() => {
      const now = new Date();
      const lastGen = new Date(user.last_generation_date!);
      const nextAllowed = new Date(lastGen.getTime() + 24 * 60 * 60 * 1000);
      const diff = nextAllowed.getTime() - now.getTime();

      if (diff <= 0) {
        setHasDownloaded(false);
        setCountdown('00:00:00');
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasDownloaded, user.last_generation_date]);

  const handleDownload = () => {
    if (flyerUrl) {
      const fileName = `Ramadan_Day_${formData.day}_${slugify(formData.topic)}.png`;
      downloadFlyer(flyerUrl, fileName);
      setHasDownloaded(true);
      if (onDownloaded) {
        onDownloaded(flyerUrl);
      }
    }
  };

  const handleRedownload = () => {
    if (flyerUrl) {
      const fileName = `Ramadan_Day_${formData.day}_${slugify(formData.topic)}.png`;
      downloadFlyer(flyerUrl, fileName);
    }
  };

  const getShareCaption = () => {
    return `🌙 Ramadan Day ${formData.day}: ${formData.topic}\n\n"${message.substring(0, 50)}..."\n\n✨ Design by RamadanBot | ${user.name}`;
  };

  const handleShare = async () => {
    if (navigator.share && flyerUrl) {
        try {
            const response = await fetch(flyerUrl);
            const blob = await response.blob();
            const file = new File([blob], `Ramadan_Day_${formData.day}.png`, { type: 'image/png' });
            
            await navigator.share({
                title: 'My Ramadan Reflection',
                text: getShareCaption(),
                files: [file]
            });
        } catch (e) {
            console.log("Error sharing", e);
            alert("Share cancelled or failed.");
        }
    } else {
        handleDownload();
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in p-6 text-center space-y-4">
        <LoadingSpinner size="lg" color="text-ios-teal" />
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Crafting Your Reflection...</h3>
          <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Loading and rendering your beautiful flyer.</p>
          <p className="text-gray-400 mt-1 text-xs font-mono">Please wait...</p>
        </div>
      </div>
    );
  }

  // Show Cooldown Screen After Download
  if (hasDownloaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ios-teal to-cyan-500 flex items-center justify-center text-white text-3xl shadow-lg">
          ✨
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Flyer Generated!</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Come back after:</p>
        </div>
        <div className="bg-gradient-to-r from-ios-teal/10 to-cyan-500/10 border border-ios-teal/30 rounded-2xl p-5 w-full">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock size={18} className="text-ios-teal" />
            <p className="text-xs font-bold text-ios-teal uppercase tracking-wider">Time Until Next</p>
          </div>
          <p className="text-4xl font-mono font-bold text-gray-900 dark:text-white">{countdown}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">24-hour reset</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Share your flyer with family and friends:</p>
        <div className="space-y-2 w-full">
          <button
            onClick={handleRedownload}
            className="w-full bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all text-sm"
          >
            <Download size={18} />
            <span>Re-download</span>
          </button>
          <button
            onClick={() => {
              const caption = `🌙 Ramadan Day ${formData.day}: ${formData.topic}\\n\\n"${message.substring(0, 60)}..."\\n\\n✨ Created with RamadanBot`;
              if (navigator.share) {
                navigator.share({
                  title: 'My Ramadan Reflection',
                  text: caption
                }).catch(() => {});
              }
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all text-sm"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <button
            onClick={onReset}
            className="w-full text-ios-teal font-bold py-2 rounded-xl hover:bg-ios-teal/10 transition-all text-sm"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (error) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center animate-fade-in space-y-4">
            <XCircle size={56} className="text-red-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Generation Failed</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{error}</p>
            <button 
                onClick={onReset}
                className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl font-bold text-sm"
            >
                Try Again
            </button>
        </div>
     );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in pb-4">
      
      {/* Header - Compact */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold mb-1 border border-green-200 dark:border-green-900">
            <Sparkles size={12} />
            <span>Success</span>
        </div>
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Your Daily Reflection</h2>
      </div>

      {/* Preview Card - REDUCED HEIGHT for Visibility */}
      <div className="flex-1 flex justify-center items-center mb-3 relative px-4 min-h-0">
        
        <div className="relative w-full max-w-[280px] aspect-square">
            {flyerUrl ? (
                <div className="relative w-full h-full transform transition-transform duration-500">
                    <img 
                        src={flyerUrl} 
                        alt="Ramadan Flyer" 
                        className="w-full h-full object-contain rounded-[20px] shadow-lg border-[3px] border-white dark:border-[#2C2C2E]"
                    />
                </div>
            ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-zinc-800 rounded-[20px] flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                </div>
            )}
        </div>
      </div>

      {/* Compact Action Sheet - Always Visible */}
      <div className="space-y-2 px-2 mt-auto">
        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-sm py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
            <Download size={18} strokeWidth={2.5} />
            <span>Download</span>
        </button>

        {/* Social Share Buttons */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Share on</p>
          <div className="grid grid-cols-4 gap-1.5">
            {/* WhatsApp */}
            <button
              onClick={() => {
                if (flyerUrl) {
                  const caption = `🌙 Day ${formData.day} Ramadan Reminder\n\n"${message}"\n\n✨ My Streak: ${user.streak} days\n\nCreate your own at RamadanBot 🤍`;
                  const text = encodeURIComponent(caption);
                  // WhatsApp Web on desktop, WhatsApp app on mobile
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                }
              }}
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-2 rounded-lg flex items-center justify-center transition-all active:scale-[0.95]"
              title="Share on WhatsApp"
            >
              <img src="/icons/whatsapp-teal.svg" alt="WhatsApp" className="w-5 h-5" />
            </button>

            {/* X (Twitter) - Now with image support */}
            <button
              onClick={async () => {
                if (flyerUrl) {
                  // For web sharing, open Twitter with text and encourage image upload
                  const caption = `Day ${formData.day} of #Ramadan\n\n"${message.substring(0, 80)}..."\n\nMy Streak: ${user.streak} days 🔥\n\n#RamadanBot #IslamicReflection`;
                  const text = encodeURIComponent(caption);
                  // Note: Twitter web intent doesn't support image in URL, but users can paste
                  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                  // Show a note about image
                  setTimeout(() => {
                    alert('💡 Tip: Upload the flyer image in the Twitter compose window for maximum engagement!');
                  }, 500);
                }
              }}
              className="bg-black hover:bg-gray-900 text-white font-bold py-2 rounded-lg flex items-center justify-center transition-all active:scale-[0.95]"
              title="Share on X (Twitter)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.669-5.829 6.669h-3.328l7.731-8.835L.424 2.25h6.679l4.882 6.479 5.288-6.479zM17.002 20.331h1.834L6.822 4.169H4.881z"/>
              </svg>
            </button>

            {/* Facebook */}
            <button
              onClick={() => {
                if (flyerUrl) {
                  const caption = `Check out my Day ${formData.day} Ramadan reflection! 🌙\n\nMy streak: ${user.streak} days 🔥\n\nCreate your own at RamadanBot`;
                  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(caption)}`;
                  window.open(url, '_blank');
                }
              }}
              className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-2 rounded-lg flex items-center justify-center transition-all active:scale-[0.95]"
              title="Share on Facebook"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            {/* Snapchat - Fixed with proper icon */}
            <button
              onClick={() => {
                if (flyerUrl) {
                  // Snapchat doesn't have direct web sharing, so we show download/manual share option
                  alert(`📸 Share on Snapchat!\n\nDay ${formData.day} Ramadan\nStreak: ${user.streak} days 🔥\n\nDownload the flyer and share it via Snapchat camera!`);
                  handleRedownload();
                }
              }}
              className="bg-[#FFFC00] hover:bg-[#F0F000] text-black font-bold py-2 rounded-lg flex items-center justify-center transition-all active:scale-[0.95]"
              title="Share on Snapchat"
            >
              <img src="/icons/snapchat-teal.svg" alt="Snapchat" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
                onClick={handleShare} 
                className="bg-white dark:bg-[#2C2C2E] text-gray-900 dark:text-white font-bold py-2.5 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform text-sm"
            >
                <Share2 size={16} />
                <span>More</span>
            </button>
            
            <button 
                onClick={onReset} 
                className="bg-gray-100 dark:bg-black/40 text-gray-600 dark:text-gray-300 font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform text-sm"
            >
                <RefreshCcw size={16} />
                <span>New</span>
            </button>
        </div>
      </div>

    </div>
  );
};

export default FlyerPreview;