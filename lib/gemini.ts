import { GoogleGenAI } from "@google/genai";
import { GenerateResponse } from "../types";

// Note: In a production Next.js app, this would be server-side.
// For this SPA implementation, we call it client-side but use the proper SDK pattern.

export const generateMessage = async (
  topic: string,
  day: number,
  hint?: string
): Promise<GenerateResponse> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return { success: false, error: "API Key is missing." };
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are a Ramadan spiritual guide. Generate an inspiring, concise message.

Topic: ${topic}
Day of Ramadan: ${day}
${hint ? `Special Request: ${hint}` : ""}

Requirements:
- Write exactly 2-3 sentences
- Maximum 250 characters total
- Warm, reflective, spiritually uplifting tone
- If specific ayah/hadith mentioned in hint, include it naturally
- Use beautiful, poetic language
- Focus on personal spiritual growth

Output only the message text, no extra formatting or preamble.
`;

    // Using gemini-3-flash-preview as per system instructions for best text performance
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for speed/basic text
      }
    });

    const text = response.text?.trim();

    if (!text) {
      return { success: false, error: "Empty response from AI." };
    }

    // Basic truncation safeguard if AI hallucinates a novel
    const cleanText = text.length > 300 ? text.substring(0, 297) + "..." : text;

    return { success: true, text: cleanText };

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate message. Please try again.",
    };
  }
};