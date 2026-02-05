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
  Compose a mature, deeply resonant Islamic reflection in clear English based on the topic: "${topic}".

  Context:
  - Ramadan Day: ${day}
  - ${hint ? `User note: ${hint}` : "Focus on spiritual growth, mercy, gratitude, and inner renewal."}

  Guidelines:
  - Tone: solemn, contemplative, uplifting, and accessible to a general audience.
  - Ground the message in broad Quranic/Prophetic virtues (mercy, patience, gratitude, forgiveness) without theological argument or sectarian language.
  - Length: 1–3 short sentences, ideally between 40 and 220 characters.
  - Avoid emojis, hashtags, quotations of long scripture, or any metadata — keep only the crafted message.
  - Do not include salutations, sign-offs, or extra commentary; return only the message text.

  Purpose:
  - The message will be placed on a Ramadan flyer and should read like a short, powerful reminder that encourages reflection and compassionate action.
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