import React, { useState, useRef, useEffect } from 'react';
import { FormData } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { checkLimitAndGenerate } from '../app/actions'; // Use Server Action
import { Send, Target, ChevronDown, Check, Info, Lightbulb } from 'lucide-react';

interface RamadanFormProps {
  onSuccess: (data: { text: string; formData: FormData }) => void;
  disabled?: boolean;
  initialName: string;
  userId: string; // Needed for tracking
}

const RamadanForm: React.FC<RamadanFormProps> = ({ onSuccess, disabled, initialName, userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    day: 1,
    hint: '',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDayOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic) return;
    
    setIsLoading(true);

    try {
      const response = await checkLimitAndGenerate(
        userId,
        formData.topic,
        formData.day,
        formData.hint
      );

      if (response.success && response.text) {
        onSuccess({ text: response.text, formData });
      } else {
        alert(response.error);
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-ios border border-gray-100 dark:border-zinc-800 p-6 space-y-5 relative z-10 transition-colors">
      
      {/* Guide & Limits */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
            <div className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                <span className="font-bold block mb-1">How It Works</span>
                Share a spiritual theme like "Patience" or "Gratitude"— we'll craft a personalized Ramadan reflection flyer for you to share.
            </div>
        </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Row for Topic and Day */}
        <div className="flex gap-3 relative z-20">
          <div className="space-y-1 flex-grow">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">Topic</label>
            <div className="relative">
                <Target size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                type="text"
                maxLength={50}
                value={formData.topic}
                onChange={(e) => handleChange('topic', e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-ios-lightGray dark:bg-zinc-800 text-gray-900 dark:text-white text-sm font-medium outline-none focus:bg-white dark:focus:bg-[#2C2C2E] focus:ring-2 ring-ios-teal transition-all placeholder:text-gray-400 placeholder:dark:text-gray-500"
                placeholder="e.g. Ihsan"
                disabled={isLoading}
                required
                />
            </div>
          </div>

          <div className="space-y-1 w-32 flex-shrink-0" ref={dropdownRef}>
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">Day</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => !isLoading && setIsDayOpen(!isDayOpen)}
                className="w-full py-3.5 px-4 rounded-2xl bg-ios-lightGray dark:bg-zinc-800 dark:text-white text-sm font-medium flex items-center justify-between outline-none focus:ring-2 ring-ios-teal transition-all"
              >
                <span>Day {formData.day}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              
              {isDayOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 max-h-60 overflow-y-auto z-50">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => { handleChange('day', day); setIsDayOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between border-b border-gray-50 dark:border-zinc-800 last:border-0 ${formData.day === day ? 'bg-ios-teal/10 text-ios-teal font-bold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800'}`}
                    >
                      <span>Day {day}</span>
                      {formData.day === day && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="space-y-1">
             <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center justify-between tracking-wider">
                <span>Hint <span className="text-[9px] font-normal opacity-70 normal-case">(optional)</span></span>
                <span className="text-[9px] opacity-60">{formData.hint?.length || 0}/300</span>
             </label>
            <div className="relative">
                <Lightbulb size={16} className="absolute left-4 top-3 text-gray-400" />
                <textarea
                    maxLength={300}
                    rows={2}
                    value={formData.hint}
                    onChange={(e) => handleChange('hint', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-ios-lightGray dark:bg-zinc-800 dark:text-white text-sm outline-none focus:bg-white dark:focus:bg-[#2C2C2E] focus:ring-2 ring-ios-teal transition-all resize-none placeholder:text-gray-400"
                    placeholder="Specific Ayah, Hadith, or theme..."
                    disabled={isLoading}
                />
            </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || disabled}
          className="w-full bg-gradient-to-r from-ios-teal to-cyan-600 hover:from-cyan-500 hover:to-ios-teal text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-cyan-500/25 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-3"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" color="text-white" />
          ) : (
            <>
              <span className="text-base">Generate Flyer Image</span>
              <Send size={18} fill="currentColor" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RamadanForm;