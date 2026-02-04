import React, { useEffect, useState } from 'react';
import { FormData } from '../types';
import { generateFlyer, downloadFlyer, slugify } from '../lib/flyerGenerator';
import LoadingSpinner from './LoadingSpinner';
import { Download, RefreshCw, Share2 } from 'lucide-react';

interface FlyerPreviewProps {
  message: string;
  formData: FormData;
  onReset: () => void;
  onFlyerGenerated?: (dataUrl: string, fileName: string) => void;
}

const FlyerPreview: React.FC<FlyerPreviewProps> = ({ message, formData, onReset, onFlyerGenerated }) => {
  const [flyerUrl, setFlyerUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    let mounted = true;

    const createFlyer = async () => {
      try {
        const url = await generateFlyer({
          width: 1080,
          height: 1080,
          backgroundColor: '#0f766e',
          textColor: '#ffffff',
          userName: formData.userName,
          topic: formData.topic,
          day: formData.day,
          message: message,
          isPremium: false // TODO: get from user
        });
        
        if (mounted) {
          setFlyerUrl(url);
          setIsGenerating(false);
          const fileName = `ramadan-day-${formData.day}-${slugify(formData.topic)}.png`;
          onFlyerGenerated?.(url, fileName);
        }
      } catch (error) {
        console.error("Flyer generation failed", error);
        if (mounted) setIsGenerating(false);
      }
    };

    createFlyer();

    return () => { mounted = false; };
  }, [message, formData, onFlyerGenerated]);

  const handleDownload = () => {
    if (flyerUrl) {
      const fileName = `ramadan-day-${formData.day}-${slugify(formData.topic)}.png`;
      downloadFlyer(flyerUrl, fileName);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50">
        <LoadingSpinner size="lg" label="Rendering your beautiful flyer..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full animate-fade-in flex flex-col items-center">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Your Flyer is Ready! 🌙</h2>
        <p className="text-gray-600">Share your spiritual reflection</p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm p-4 rounded-3xl shadow-xl border border-gray-200/50 max-h-[60vh] overflow-hidden flex justify-center items-center">
        {flyerUrl && (
          <img 
            src={flyerUrl} 
            alt="Ramadan Flyer Preview" 
            className="h-full w-auto max-h-[55vh] object-contain rounded-2xl shadow-lg"
          />
        )}
      </div>

      <div className="flex gap-4 w-full">
        <button
          onClick={onReset}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 text-base"
        >
          <RefreshCw size={18} />
          Back
        </button>
        
        <button
          onClick={handleDownload}
          className="flex-[2] bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98]"
          onTouchStart={() => {
            if (navigator.vibrate) {
              navigator.vibrate(50);
            }
          }}
        >
          <Download size={20} />
          Download
        </button>
      </div>
      
      <div className="text-center">
        <p className="text-teal-600 text-sm font-medium flex items-center justify-center gap-2">
          <Share2 size={14} />
          Share your reflection with the Ummah!
        </p>
      </div>
    </div>
  );
};

export default FlyerPreview;