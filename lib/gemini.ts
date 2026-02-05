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

    // Enhanced Deep Islamic Reflection Prompt
    const prompt = `You are a profound Islamic scholar and spiritual guide crafting daily Ramadan reflections.

TOPIC: "${topic}"
RAMADAN DAY: ${day}
${hint ? `ADDITIONAL CONTEXT: ${hint}` : ""}

TASK:
Create a deep, rich, and meaningful Islamic reflection that demonstrates profound spiritual insight. This reflection will inspire people during Ramadan to connect with Islamic virtues and teachings.

REQUIREMENTS:
1. LENGTH: 2-4 substantive sentences (aim for 180-400 characters - this allows depth, not brevity)
2. DEPTH: Draw from Quranic principles, hadith wisdom, and Islamic philosophy without direct quotations
3. SUBSTANCE: Go beyond platitudes. Explore the "why" and "how" of the virtue of "${topic}"
4. RELEVANCE: Connect the theme to Ramadan's spiritual significance on day ${day}
5. LANGUAGE: Eloquent, poetic, yet accessible English. Use metaphor and vivid imagery when appropriate
6. VIRTUE FOUNDATION: Ground in Islamic virtues like: Taqwa (God-consciousness), Ihsan (excellence), Sabr (patience), Rahmah (mercy), 'Ilm (knowledge), Shukr (gratitude), Tawbah (repentance), Tawhid (divine unity)
7. EMOTIONAL RESONANCE: Inspire introspection, motivate righteous action, uplift the heart
8. NO ADDITIONS: Return ONLY the reflection text - no labels, no attribution, no extra commentary

EXAMPLES OF DEPTH (These are templates - create original content):
- Instead of "Be patient" → "Patience is not mere silence; it is the quiet strength that rebuilds broken spirits and transforms suffering into wisdom."
- Instead of "Be grateful" → "Gratitude rewires the soul to see blessings where others see only trials, turning the ordinary into the sacred."

Now compose a rich, profound Islamic reflection on the topic "${topic}" for Ramadan Day ${day}:`;

    // Using gemini-2.5-flash-lite
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