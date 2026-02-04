'use server';

import { GoogleGenAI } from "@google/genai";
import { GenerateResponse } from "../types";

export const generateMessage = async (
  topic: string,
  day: number,
  hint?: string
): Promise<GenerateResponse> => {
  try {
    // Check for GEMINI_API_KEY (as requested) or fallback to API_KEY
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    
    if (!apiKey) {
      console.error("API Key missing. Please set GEMINI_API_KEY in your environment variables.");
      return { success: false, error: "Configuration Error: API Key missing." };
    }

    const ai = new GoogleGenAI({ apiKey });

    // Updated Prompt Strategy as requested
    const prompt = `
Generate a conscious islamic based reflective moderate English reminder text using the topic: "${topic}".

Context:
- Ramadan Day: ${day}
- ${hint ? `Specific Request: ${hint}` : "Focus on spiritual growth and mindfulness."}

Constraints:
- Keep it under 250 characters.
- Tone: Elegant, moderate, reflective, and spiritually uplifting.
- No emojis in the response text (they will be added by the design).
- Output ONLY the message text.
`;

    // Using gemini-2.5-flash-lite as requested
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const text = response.text?.trim();

    if (!text) {
      return { success: false, error: "Empty response from AI." };
    }

    // Basic truncation safeguard
    const cleanText = text.length > 300 ? text.substring(0, 297) + "..." : text;

    return { success: true, text: cleanText };

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return {
      success: false,
      error: "Failed to generate message. Please try again.",
    };
  }
};