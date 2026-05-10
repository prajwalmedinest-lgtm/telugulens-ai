import { runGemini } from './gemini.service.js';
import { runGrok } from './grok.service.js';

export class HospitalService {
  static async explainMedicalDocument(text: string) {
    const medicalPrompt = `
      You are a specialized medical document explainer. Analyze the following medical text (prescription, lab report, or discharge summary) and provide a clear, simplified explanation.
      
      Requirements:
      1. Explain complex medical terms in plain English.
      2. If it's a lab result, explain if values are generally within normal ranges or not.
      3. If it's a prescription, summarize the medication names and their typical usage (if mentioned).
      4. Avoid overly technical jargon.
      5. Maintain a professional yet empathetic tone.
      
      Medical Text:
      ${text.substring(0, 8000)}
    `;

    console.log('[Medical] Sending to Gemini for medical explanation...');
    const medicalExplanation = await runGemini(medicalPrompt);

    console.log('[Medical] Sending to Grok for Telugu conversion...');
    const teluguExplanation = await runGrok(medicalExplanation);

    const disclaimer = "This is AI-generated information and not a replacement for a doctor. Always consult a qualified medical professional for diagnosis and treatment.";

    return {
      medicalExplanation,
      teluguExplanation,
      disclaimer
    };
  }
}
