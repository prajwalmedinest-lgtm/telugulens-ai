import OpenAI from "openai";
import { env } from "../config/env.js";
import { runGemini } from './gemini.service.js';

const openai = new OpenAI({
  apiKey: env.GROK_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

export const runGrok = async (text: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "grok-3-mini",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant that converts AI outputs into simple, natural, and conversational Telugu. Preserve the original meaning but make it sound like a friendly native speaker." 
        },
        { 
          role: "user", 
          content: `Convert this text into simple conversational Telugu: ${text}` 
        },
      ],
    });

    return response.choices[0].message.content || "సారీ, సమాధానం అందించడంలో సమస్య ఏర్పడింది.";
  } catch (error: any) {
    console.error('Grok API Error (using Gemini fallback):', error.message);
    
    // Fallback to Gemini for translation if Grok fails (e.g., no credits)
    const fallbackPrompt = `Translate the following text into simple, natural, conversational Telugu: ${text}`;
    try {
      const fallbackResponse = await runGemini(fallbackPrompt);
      return fallbackResponse;
    } catch (fallbackError) {
      console.error('Gemini fallback also failed:', fallbackError);
      throw new Error('Failed to convert content to Telugu using both Grok and Gemini');
    }
  }
};
