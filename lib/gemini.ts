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

    // Authentic Islamic Reflection Prompt - NOT philosophical
    const prompt = `You are a learned Islamic scholar and Quranic guide crafting profound Ramadan daily reflections.

TOPIC/VIRTUE: "${topic}"
RAMADAN DAY: ${day}
${hint ? `HADITH/QURAN REFERENCE: ${hint}` : ""}

CRITICAL REQUIREMENTS:
1. USE ALLAH - Always reference "Allah" (not "God", "divine", "the Creator", etc.)
2. GROUNDING: Root the message in authentic Quranic concepts, Prophetic traditions (Sunnah), and Islamic teachings
3. LANGUAGE: Use Islamic terminology naturally - "Dua", "Taqwa", "Akhirah", "Deen", "Sabr", "Shukr", "Tawhid"
4. AUTHENTICITY: This is an Islamic reminder for Muslim audience, not secular philosophy
5. LENGTH: 150-250 characters exactly (1-3 powerful, concise sentences). BRIEF AND IMPACTFUL. NO TRUNCATION.
6. DEPTH: Deliver ONE core insight about why this virtue matters in Islam and how to embody it
7. TONE: Solemn, inspirational, reflective. Connect to Ramadan's spiritual essence on day ${day}
8. NO ADDITIONS: Return ONLY the reflection text - no labels, asterisks, or commentary

FRAMEWORK - Craft ONE powerful sentence:
- Start with the Islamic essence of "${topic}" grounded in Quran/Sunnah
- Connect directly to Allah's wisdom and guidance
- Conclude with inspirational call to action for this blessed month
- Keep it concise but profoundly meaningful (150-250 chars)

AUTHENTIC EXAMPLES (create NEW content, don't copy):
- Powerful: "In Sabr lies the doorway to Allah's infinite reward. Every moment of patience perfects your Taqwa." (≈100 chars)
- Powerful: "Shukr transforms the heart—when we thank Allah, we draw nearer to His mercy. Gratitude is the path to abundance." (≈120 chars)
- Structure: [Islamic Concept] [Quranic Truth/Wisdom] [Ramadan Action]. Keep it under 250 characters.

QUALITY CHECKS:
✓ Does it mention Allah directly?
✓ Does it use Islamic concepts (Quran, Sunnah, Islamic virtues)?
✓ Is it meaningful and substantial (not generic)?
✓ Would a Muslim find it spiritually nourishing?
✓ Is it properly complete (not cut off)?

Now compose the reflection on "${topic}" for Ramadan Day ${day}:`;

    // Using gemini-2.5-flash-lite
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const text = response.text?.trim();

    if (!text) {
      return { success: false, error: "Empty response from AI." };
    }

    // NO truncation - keep the full text
    return { success: true, text: text };

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return {
      success: false,
      error: "Failed to generate message. Please try again.",
    };
  }
};