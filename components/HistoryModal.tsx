'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, FileText, Sparkles } from 'lucide-react';

interface HistoryItem {
  day: number;
  topic: string;
  date: string;
  message?: string;
  userName?: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoadingHistory(true);
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('generationHistory') : null;
        const items = raw ? JSON.parse(raw) : [];
        setHistory(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error('Failed to load history:', error);
        setHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    }
  }, [isOpen]);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      localStorage.removeItem('generationHistory');
      setHistory([]);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className={`fixed bottom-0 left-0 right-0 w-full max-w-2xl mx-auto bg-white dark:bg-[#1C1C1E] rounded-t-3xl z-50 transform transition-all duration-300 max-h-[80vh] overflow-hidden shadow-2xl ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#1C1C1E] border-b border-gray-200 dark:border-zinc-800 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ios-teal/10 flex items-center justify-center">
              <Sparkles size={20} className="text-ios-teal" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Generation History</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{history.length} flyers created</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)', touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}>
          {loadingHistory ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ios-teal mx-auto mb-3"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading history...</p>
              </div>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No History Yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Create your first Ramadan flyer to start building your history!
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-4 bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-ios-teal/30"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-ios-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ios-teal/20 transition-colors">
                      <FileText size={18} className="text-ios-teal" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm">
                        Day {item.day}: {item.topic}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <Calendar size={14} />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                  {item.message && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate ml-11 mt-2 italic">
                      "{item.message.substring(0, 80)}..."
                    </p>
                  )}
                  {item.userName && (
                    <p className="text-xs text-ios-teal font-medium ml-11 mt-1">
                      By: {item.userName}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="sticky bottom-0 bg-white dark:bg-[#1C1C1E] border-t border-gray-200 dark:border-zinc-800 p-4 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm"
            >
              Close
            </button>
            <button
              onClick={clearHistory}
              className="flex-1 px-4 py-2.5 bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-100 dark:hover:bg-red-600/30 transition-colors text-sm"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryModal;
