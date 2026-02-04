import React, { useEffect, useState } from 'react';
import { FormData, User } from '../types';
import { generateFlyer, downloadFlyer, slugify } from '../lib/flyerGenerator';
import LoadingSpinner from './LoadingSpinner';
import { Download, Share2, RefreshCcw, Sparkles, XCircle } from 'lucide-react';

interface FlyerPreviewProps {
  message: string;
  formData: FormData;
  onReset: () => void;
  user: User;
}

const FlyerPreview: React.FC<FlyerPreviewProps> = ({ message, formData, onReset, user }) => {
  const [flyerUrl, setFlyerUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setError("Could not render the design. Please try again.");
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

  const handleDownload = () => {
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
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in p-6 text-center">
        <LoadingSpinner size="lg" color="text-ios-teal" />
        <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-white">Designing Masterpiece...</h3>
        <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Applying Islamic geometry and typesetting your reflection.</p>
      </div>
    );
  }

  if (error) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center animate-fade-in">
            <XCircle size={64} className="text-red-500 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Generation Failed</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">{error}</p>
            <button 
                onClick={onReset}
                className="bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-bold"
            >
                Try Again
            </button>
        </div>
     );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in pb-4">
      
      {/* Header - Compact */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold mb-1 border border-green-200 dark:border-green-900">
            <Sparkles size={12} />
            <span>Success</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Daily Reflection</h2>
      </div>

      {/* Preview Card - REDUCED HEIGHT for Visibility */}
      <div className="flex-1 flex justify-center items-center mb-4 relative px-4 min-h-0">
        
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
          className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-base py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
            <Download size={20} strokeWidth={2.5} />
            <span>Download High-Res</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
            <button 
                onClick={handleShare} 
                className="bg-white dark:bg-[#2C2C2E] text-gray-900 dark:text-white font-bold py-3 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
                <Share2 size={18} />
                <span>Share</span>
            </button>
            
            <button 
                onClick={onReset} 
                className="bg-gray-100 dark:bg-black/40 text-gray-600 dark:text-gray-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
                <RefreshCcw size={18} />
                <span>New</span>
            </button>
        </div>
      </div>

    </div>
  );
};

export default FlyerPreview;