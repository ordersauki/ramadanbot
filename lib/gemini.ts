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

    // Authentic Islamic Reflection Prompt - Perfect Grammar and Meaning
    const prompt = `You are a learned Islamic scholar crafting exquisite Ramadan daily reflections with impeccable grammar and profound meaning.

TOPIC: "${topic}"
RAMADAN DAY: ${day}
${hint ? `REFERENCE: ${hint}` : ""}

CRITICAL QUALITY STANDARDS:
1. **GRAMMAR & PUNCTUATION**: Flawless. Every sentence must be grammatically perfect with proper punctuation.
2. **MEANINGFUL**: Every word carries weight. No filler. Each concept directly connects to the virtue and Ramadan.
3. **CONNECTED**: Sentences flow naturally. Ideas build upon each other, creating a coherent spiritual message.
4. **AUTHENTIC ISLAMIC**: Root in Quranic concepts, Prophet's traditions (Sunnah), and Islamic virtues—never philosophical abstraction.
5. **DIRECT TO ALLAH**: Always reference "Allah"—never "God," "the divine," "higher power," etc.
6. **VOCABULARY**: Use Islamic terminology naturally: Taqwa, Ihsan, Sabr, Shukr, Dua, Rahmah, Tawhid.
7. **BREVITY WITH DEPTH**: 150-250 characters exactly. Concise yet substantive (2-3 sentences maximum).
8. **TONE**: Solemn, inspirational, reflective. Connect to day ${day} of Ramadan's spiritual journey.

STRUCTURE (CRITICAL):
- Opening: Islamic principle rooted in Quran/Sunnah about "${topic}"
- Middle: Quranic truth or Prophet's wisdom that illuminates this virtue
- Closing: Actionable call to embody this on day ${day} of Ramadan
- Flow: Each sentence builds naturally on the previous; no abrupt transitions

GRAMMAR RULES:
✓ Proper subject-verb agreement
✓ Correct tense consistency (present tense preferred for timeless truths)
✓ Proper punctuation (semicolons for related ideas, commas for clarity)
✓ No run-on sentences
✓ Clear antecedent references
✓ Active voice where possible (more powerful)

AUTHENTICITY EXAMPLES (GRAMMAR-PERFECT):
- "Allah promises in the Quran that those who are patient receive reward without measure; sabr opens the door to His infinite mercy." (115 chars - PERFECT)
- "Shukr—gratitude to Allah—is the foundation of spiritual growth; when we thank Allah, our hearts draw nearer to His presence and guidance." (125 chars - PERFECT)
- "The Prophet taught that Taqwa is the adornment of the soul; on this blessed day, let us guard our hearts and intentions for Allah's sake." (130 chars - PERFECT)

MEANING CHECK:
✓ Is there a clear spiritual lesson?
✓ Does it reference Allah specifically?
✓ Would this strengthen a Muslim's faith on day ${day}?
✓ Can a reader immediately understand and act on it?
✓ Is there no ambiguity or hollow phrases?

Now write ONE reflection on "${topic}" for Ramadan Day ${day}. Perfect grammar. Perfect punctuation. Perfect meaning. Connected sentences:`;

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