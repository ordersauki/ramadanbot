import React, { useEffect, useState } from 'react';
import { FormData } from '../types';
import { generateFlyer, downloadFlyer, slugify } from '../lib/flyerGenerator';
import LoadingSpinner from './LoadingSpinner';
import { Download, RefreshCw, Share2, MessageCircle, Mail, Link as LinkIcon } from 'lucide-react';

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
          
          // Save to flyer history
          saveFlyerToHistory(url, fileName);
          
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

  const saveFlyerToHistory = (dataUrl: string, fileName: string) => {
    try {
      const history = localStorage.getItem('ramadanBot_flyerHistory') || '[]';
      const flyers = JSON.parse(history);
      
      const newFlyer = {
        id: Date.now().toString(),
        dataUrl,
        fileName,
        formData,
        createdAt: new Date().toISOString(),
      };
      
      // Keep only last 50 flyers
      const updated = [newFlyer, ...flyers].slice(0, 50);
      localStorage.setItem('ramadanBot_flyerHistory', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save flyer to history', e);
    }
  };

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

      {/* Social Sharing Section */}
      <div className="w-full bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
        <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">Share Your Reflection 💭</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* WhatsApp */}
          <button
            onClick={() => {
              const text = `Check out my Ramadan reflection from Ramadan Bot! 🌙\n\nTopic: ${formData.topic}\nDay ${formData.day}: "${message}"\n\nGenerate yours at: ramadanbot.vercel.app`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
            }}
            className="bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm"
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>

          {/* Email */}
          <button
            onClick={() => {
              const subject = `Check out my Ramadan Bot Flyer - Day ${formData.day}`;
              const emailBody = `Hi,\n\nI generated a beautiful flyer on Ramadan Bot for Day ${formData.day}.\n\nTopic: ${formData.topic}\nMessage: "${message}"\n\nGenerate your own at: ramadanbot.vercel.app\n\nBest regards`;
              window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`);
            }}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm"
          >
            <Mail size={18} />
            Email
          </button>

          {/* Copy Link */}
          <button
            onClick={() => {
              navigator.clipboard.writeText('https://ramadanbot.vercel.app');
              alert('Link copied to clipboard! 📋');
            }}
            className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm"
          >
            <LinkIcon size={18} />
            Copy Link
          </button>

          {/* Share Flyer */}
          <button
            onClick={() => {
              if (navigator.share && flyerUrl) {
                navigator.share({
                  title: `Ramadan Flyer - Day ${formData.day}`,
                  text: `Check out my Ramadan reflection: ${formData.topic}`,
                  url: 'https://ramadanbot.vercel.app'
                });
              }
            }}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-3 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm"
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlyerPreview;