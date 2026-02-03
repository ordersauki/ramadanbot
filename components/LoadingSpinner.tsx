import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'text-primary-600', 
  label 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 
        className={`animate-spin ${sizeClasses[size]} ${color}`} 
        aria-label="Loading"
      />
      {label && (
        <span className="text-sm font-medium text-gray-500 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;