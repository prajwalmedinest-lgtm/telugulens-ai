import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "క్షమించండి, ఏదో తప్పు జరిగింది. మళ్ళీ ప్రయత్నించండి. (Sorry, something went wrong. Please try again.)";
  }
};

export const analyzePDF = async (base64Data: string, mimeType: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Please analyze this document in detail end-to-end. Provide a comprehensive summary, key points, and all relevant details. IMPORTANT: Respond ENTIRELY in Telugu language. Use clear headings and bullet points.";
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      }
    ]);
    
    return result.response.text();
  } catch (error) {
    console.error("Gemini PDF Analysis Error:", error);
    return "క్షమించండి, డాక్యుమెంట్ విశ్లేషణలో లోపం జరిగింది. (Sorry, there was an error in document analysis.)";
  }
};
