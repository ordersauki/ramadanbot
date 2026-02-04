import { differenceInHours, differenceInMinutes, startOfTomorrow, isSameDay, parseISO } from 'date-fns';

const STORAGE_KEY = 'ramadanBot_rateLimit';

interface RateLimitData {
  lastGeneration: string;
  generationCount: number;
  resetDate: string;
  flyerData?: {
    dataUrl: string;
    fileName: string;
    formData: FormData;
  };
}

interface FormData {
  userName: string;
  topic: string;
  day: number;
  hint?: string;
}

export const canGenerate = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;

    const data: RateLimitData = JSON.parse(stored);
    const lastGenDate = parseISO(data.lastGeneration);
    const now = new Date();

    // If last generation was on a different day, allow
    if (!isSameDay(lastGenDate, now)) {
      return true;
    }

    return false;
  } catch (e) {
    console.error("Rate limit check error", e);
    // On error, default to allowing generation to avoid blocking valid users
    return true;
  }
};

export const recordGeneration = (flyerData?: { dataUrl: string; fileName: string; formData: FormData }): void => {
  if (typeof window === 'undefined') return;

  const now = new Date();
  const resetDate = startOfTomorrow();

  const data: RateLimitData = {
    lastGeneration: now.toISOString(),
    generationCount: 1,
    resetDate: resetDate.toISOString(),
    flyerData,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getRemainingTime = (): string => {
  if (typeof window === 'undefined') return '';

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return '';

    const data: RateLimitData = JSON.parse(stored);
    const resetDate = parseISO(data.resetDate);
    const now = new Date();

    const hours = differenceInHours(resetDate, now);
    const minutes = differenceInMinutes(resetDate, now) % 60;

    if (hours > 0) {
      return `in ${hours}h ${minutes}m`;
    }
    return `in ${minutes} minutes`;
  } catch (e) {
    return 'soon';
  }
};

export const getResetTime = (): string => {
     if (typeof window === 'undefined') return new Date().toISOString();
     try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if(!stored) return startOfTomorrow().toISOString();
        const data: RateLimitData = JSON.parse(stored);
        return data.resetDate;
     } catch (e) {
         return startOfTomorrow().toISOString();
     }
}

export const getStoredFlyer = (): { dataUrl: string; fileName: string; formData: FormData } | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const data: RateLimitData = JSON.parse(stored);
    return data.flyerData || null;
  } catch (e) {
    return null;
  }
};

export const resetRateLimit = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};