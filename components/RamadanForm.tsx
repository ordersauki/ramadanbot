import React, { useState, useRef, useEffect } from 'react';
import { FormData, GenerateResponse } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { generateMessage } from '../lib/gemini';
import { Send, Calendar, Lightbulb, User, Target, ChevronDown, Check } from 'lucide-react';

interface RamadanFormProps {
  onSuccess: (data: { text: string; formData: FormData }) => void;
  disabled?: boolean;
}

const RamadanForm: React.FC<RamadanFormProps> = ({ onSuccess, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isDayOpen, setIsDayOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    topic: '',
    day: 1,
    hint: '',
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDayOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (formData.userName.length < 2 || formData.userName.length > 50) {
      newErrors.userName = "Name must be between 2 and 50 characters";
    }
    if (formData.topic.length < 2 || formData.topic.length > 50) {
      newErrors.topic = "Topic must be between 2 and 50 characters";
    }
    if (formData.day < 1 || formData.day > 30) {
      newErrors.day = "Please select a valid day (1-30)";
    }
    if (formData.hint && formData.hint.length > 300) {
      newErrors.hint = "Hint cannot exceed 300 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (disabled) return;

    setIsLoading(true);

    try {
      const response: GenerateResponse = await generateMessage(
        formData.topic,
        formData.day,
        formData.hint
      );

      if (response.success && response.text) {
        onSuccess({ text: response.text, formData });
      } else {
        alert(response.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-5 border border-gray-100 relative z-10">
      <form onSubmit={handleSubmit} className="space-y-3">
        
        {/* Name Input */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wide">
            <User size={14} className="text-primary-600" />
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
            className={`w-full p-3 rounded-lg border bg-gray-50 focus:bg-white text-sm transition-all outline-none ring-primary-200 focus:ring-2 ${errors.userName ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'}`}
            placeholder="e.g. Abdallah"
            disabled={isLoading}
          />
          {errors.userName && <p className="text-[10px] text-red-500 ml-1">{errors.userName}</p>}
        </div>

        {/* Row for Topic and Day */}
        <div className="flex gap-3 relative z-20">
          {/* Topic Input - Grows */}
          <div className="space-y-1 flex-grow">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                <Target size={14} className="text-primary-600" />
                Topic <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="text"
              maxLength={50}
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              className={`w-full p-3 rounded-lg border bg-gray-50 focus:bg-white text-sm transition-all outline-none ring-primary-200 focus:ring-2 ${errors.topic ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'}`}
              placeholder="e.g. Ihsan"
              disabled={isLoading}
            />
            {errors.topic && <p className="text-[10px] text-red-500 ml-1">{errors.topic}</p>}
          </div>

          {/* Custom iOS Style Day Select */}
          <div className="space-y-1 w-28 flex-shrink-0" ref={dropdownRef}>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wide">
              <Calendar size={14} className="text-primary-600" />
              Day <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => !isLoading && setIsDayOpen(!isDayOpen)}
                className={`w-full p-3 rounded-lg border bg-gray-50 text-sm flex items-center justify-between transition-all outline-none ring-primary-200 focus:ring-2 ${isDayOpen ? 'ring-2 border-primary-500 bg-white' : 'border-gray-200 hover:bg-white'}`}
                disabled={isLoading}
              >
                <span className="text-gray-900 font-medium">Day {formData.day}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isDayOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isDayOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 max-h-64 overflow-y-auto z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="py-1 sticky top-0 bg-white border-b border-gray-50 px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Select Day
                  </div>
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        handleChange('day', day);
                        setIsDayOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${formData.day === day ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700'}`}
                    >
                      <span>Day {day}</span>
                      {formData.day === day && <Check size={14} className="text-primary-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hint Textarea */}
        <div className="space-y-1 relative z-0">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wide">
              <Lightbulb size={14} className="text-secondary-500" />
              Hint
            </label>
            <span className="text-[10px] text-gray-400">{formData.hint?.length || 0}/300</span>
          </div>
          <textarea
            maxLength={300}
            rows={2}
            value={formData.hint}
            onChange={(e) => handleChange('hint', e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 text-sm outline-none ring-primary-200 focus:ring-2 resize-none"
            placeholder="Specific Ayah, Hadith, or theme..."
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || disabled}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" color="text-white" label="Generating..." />
          ) : (
            <>
              <span className="text-sm">Generate Flyer</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RamadanForm;