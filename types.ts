export interface FormData {
  userName: string;
  topic: string;
  day: number;
  hint?: string;
}

export interface RateLimitData {
  lastGeneration: string; // ISO date
  generationCount: number;
  resetDate: string; // ISO date
  flyerData?: {
    dataUrl: string;
    fileName: string;
    formData: FormData;
  };
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

export interface GenerateResponse {
  success: boolean;
  text?: string;
  error?: string;
}

export interface GeneratedData {
  text: string;
  formData: FormData;
}