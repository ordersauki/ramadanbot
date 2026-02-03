import React, { useEffect, useState } from 'react';
import { FormData } from '../types';
import { generateFlyer, downloadFlyer, slugify } from '../lib/flyerGenerator';
import LoadingSpinner from './LoadingSpinner';
import { Download, RefreshCw, Share2 } from 'lucide-react';

interface FlyerPreviewProps {
  message: string;
  formData: FormData;
  onReset: () => void;
}

const FlyerPreview: React.FC<FlyerPreviewProps> = ({ message, formData, onReset }) => {
  const [flyerUrl, setFlyerUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    let mounted = true;

    const createFlyer = async () => {
      try {
        const url = await generateFlyer({
          width: 1080,
          height: 1920,
          backgroundColor: '#0f766e',
          textColor: '#ffffff',
          userName: formData.userName,
          topic: formData.topic,
          day: formData.day,
          message: message
        });
        
        if (mounted) {
          setFlyerUrl(url);
          setIsGenerating(false);
        }
      } catch (error) {
        console.error("Flyer generation failed", error);
        if (mounted) setIsGenerating(false);
      }
    };

    createFlyer();

    return () => { mounted = false; };
  }, [message, formData]);

  const handleDownload = () => {
    if (flyerUrl) {
      const fileName = `ramadan-day-${formData.day}-${slugify(formData.topic)}.png`;
      downloadFlyer(flyerUrl, fileName);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl">
        <LoadingSpinner size="lg" label="Rendering your beautiful flyer..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full animate-fade-in flex flex-col items-center">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-primary-800">Your Flyer is Ready! 🌙</h2>
      </div>

      <div className="bg-white p-2 rounded-xl shadow-md border border-gray-100 max-h-[50vh] overflow-hidden flex justify-center items-center">
        {flyerUrl && (
          <img 
            src={flyerUrl} 
            alt="Ramadan Flyer Preview" 
            className="h-full w-auto max-h-[48vh] object-contain rounded-lg shadow-sm"
          />
        )}
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={onReset}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <RefreshCw size={16} />
          Back
        </button>
        
        <button
          onClick={handleDownload}
          className="flex-[2] bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98] text-sm"
        >
          <Download size={18} />
          Download
        </button>
      </div>
      
      <div className="text-center">
        <p className="text-primary-600 text-xs font-medium flex items-center justify-center gap-1">
          <Share2 size={12} />
          Share your reflection with the Ummah!
        </p>
      </div>
    </div>
  );
};

export default FlyerPreview;