import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env.js";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const runGemini = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content from Gemini");
  }
};

export const runGeminiStream = async (
  prompt: string,
  onToken: (token: string) => void
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContentStream(prompt);

    let fullText = "";
    for await (const chunk of result.stream) {
      const token = chunk.text();
      if (token) {
        fullText += token;
        onToken(token);
      }
    }

    return fullText;
  } catch (error) {
    console.error("Gemini Streaming API Error:", error);
    throw new Error("Failed to stream content from Gemini");
  }
};
