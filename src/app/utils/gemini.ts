import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Gemini API Key is missing! Please check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

// Using a more stable model identifier
const MODEL_NAME = "gemini-1.5-flash";

export const getGeminiResponse = async (prompt: string) => {
  try {
    if (!API_KEY) throw new Error("API Key Missing");
    
    console.log("Requesting Gemini for:", prompt.substring(0, 50) + "...");
    
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) throw new Error("Empty response from Gemini");
    
    return text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    
    // Fallback attempt with a different model if it's a 404
    try {
      console.log("Attempting fallback to gemini-pro...");
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await fallbackModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (fallbackError) {
      console.error("Gemini Fallback Error:", fallbackError);
      return "క్షమించండి, సర్వర్ స్పందించడం లేదు. దయచేసి కాసేపు ఆగి ప్రయత్నించండి. (Sorry, the server is not responding. Please try again in a moment.)";
    }
  }
};

export const analyzePDF = async (base64Data: string, mimeType: string) => {
  try {
    if (!API_KEY) throw new Error("API Key Missing");

    console.log("Analyzing PDF with Gemini...");
    
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
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
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini PDF Analysis Error:", error);
    return "క్షమించండి, డాక్యుమెంట్ విశ్లేషణలో లోపం జరిగింది. (Sorry, there was an error in document analysis.)";
  }
};
