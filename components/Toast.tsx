'use client';

import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, duration = 4000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-900/50',
    error: 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-900/50',
    warning: 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-900/50',
    info: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900/50',
  };

  const textColor = {
    success: 'text-green-800 dark:text-green-300',
    error: 'text-red-800 dark:text-red-300',
    warning: 'text-amber-800 dark:text-amber-300',
    info: 'text-blue-800 dark:text-blue-300',
  };

  const iconColor = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-amber-600 dark:text-amber-400',
    info: 'text-blue-600 dark:text-blue-400',
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div
      className={`fixed top-4 left-4 right-4 max-w-sm mx-auto z-[9999] animate-fade-in-up
        ${bgColor[type]} border rounded-lg shadow-lg p-4 flex items-center gap-3`}
    >
      <div className={iconColor[type]}>{icons[type]}</div>
      <p className={`${textColor[type]} text-sm font-medium flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className={`${textColor[type]} hover:opacity-70 transition-opacity`}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
