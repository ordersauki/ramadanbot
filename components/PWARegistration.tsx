'use client';

import { useEffect } from 'react';

export function PWARegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✓ Service Worker registered successfully:', registration);
          })
          .catch((error) => {
            console.log('✗ Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return null;
}
