import { differenceInHours, differenceInMinutes, startOfTomorrow, isSameDay, parseISO } from 'date-fns';

const STORAGE_KEY = 'ramadanBot_rateLimit';
const MAX_GENERATIONS_PER_DAY = 3; // Increased from 1 to 3

interface RateLimitData {
  lastGeneration: string;
  generationCount: number;
  resetDate: string;
}

export const canGenerate = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;

    const data: RateLimitData = JSON.parse(stored);
    const lastGenDate = parseISO(data.lastGeneration);
    const now = new Date();

    // If last generation was on a different day, reset counter
    if (!isSameDay(lastGenDate, now)) {
      return true;
    }

    // If same day and count is less than max, allow
    return data.generationCount < MAX_GENERATIONS_PER_DAY;
  } catch (e) {
    console.error("Rate limit check error", e);
    // On error, default to allowing generation to avoid blocking valid users
    return true;
  }
};

export const recordGeneration = (): void => {
  if (typeof window === 'undefined') return;

  const now = new Date();
  const resetDate = startOfTomorrow();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let count = 1;

    if (stored) {
      const data: RateLimitData = JSON.parse(stored);
      const lastGenDate = parseISO(data.lastGeneration);

      // If same day, increment counter
      if (isSameDay(lastGenDate, now)) {
        count = Math.min(data.generationCount + 1, MAX_GENERATIONS_PER_DAY);
      }
    }

    const data: RateLimitData = {
      lastGeneration: now.toISOString(),
      generationCount: count,
      resetDate: resetDate.toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error recording generation", e);
  }
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

export const resetRateLimit = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};