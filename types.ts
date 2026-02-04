export interface User {
  id: string;
  name: string;
  role: 'user' | 'admin';
  streak: number;
  generation_count: number;
  last_login: string;
  last_generation_date: string | null;
  rate_limit_override: number;
  is_banned: boolean;
  created_at: string;
}

export interface FormData {
  topic: string;
  day: number;
  hint?: string;
}

export interface GenerateResponse {
  success: boolean;
  text?: string;
  error?: string;
}

export interface GeneratedData {
  text: string;
  formData: FormData;
}

export interface AppState {
  view: 'login' | 'app' | 'admin' | 'settings';
  currentUser: User | null;
  isDarkMode: boolean;
}

export interface FlyerConfig {
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  userName: string;
  topic: string;
  day: number;
  message: string;
}

export interface AnalyticsData {
  totalUsers: number;
  totalGenerations: number;
  activeToday: number;
  bannedUsers: number;
  recentGenerations: {
    id: string;
    topic: string;
    user_name: string;
    created_at: string;
  }[];
}