import { Request, Response, NextFunction } from "express";
import { PDFService } from "../services/pdf.service.js";
import { runGemini } from "../services/gemini.service.js";
import { runGrok } from "../services/grok.service.js";

export const uploadPDFController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ status: "error", message: "No file uploaded" });
      return;
    }

    // 1. Extract text from PDF buffer
    const text = await PDFService.extractText(req.file.buffer);

    // 2. Gemini Analysis
    const analysisPrompt = `Analyze the following document text and provide a concise summary in English: \n\n${text}`;
    const summary = await runGemini(analysisPrompt);

    // 3. Grok Telugu simplification
    const teluguSummary = await runGrok(summary);

    res.status(200).json({
      status: "success",
      summary,
      teluguSummary,
    });
  } catch (error) {
    next(error);
  }
};
