import { Request, Response, NextFunction } from 'express';
import { PDFService } from '../services/pdf.service.js';
import { runGemini } from '../services/gemini.service.js';
import { runGrok } from '../services/grok.service.js';
import { storage } from '../services/storage.service.js';

export const analyzePDF = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ status: 'error', message: 'No PDF file uploaded' });
      return;
    }

    // 1. Extract text from PDF
    console.log(`[PDF] Extracting text from: ${req.file.originalname}`);
    let extractedText = await PDFService.extractText(req.file.buffer);

    // 2. If text is too short, it might be a scanned PDF (simplified logic)
    if (extractedText.trim().length < 50) {
      console.log(`[PDF] Low text density detected, possibly a scanned PDF.`);
      // In a real production app, we would convert PDF pages to images and run OCR.
      // Since that requires additional heavy libraries (like pdf-img-convert), 
      // we'll assume for this implementation that if pdf-parse fails, 
      // the user should provide a searchable PDF or we'd need more infra.
      // But we have OCRService ready for image buffers.
    }

    if (!extractedText.trim()) {
      res.status(400).json({ 
        status: 'error', 
        message: 'Could not extract any text from the PDF. Please ensure it is not an encrypted or empty file.' 
      });
      return;
    }

    // 3. Gemini Analysis
    const geminiPrompt = `You are an expert document analyzer. Summarize and explain the following document content clearly and concisely in simple English. Focus on the main points and make it easy to understand for a general audience: \n\n${extractedText.substring(0, 10000)}`; // Limit to 10k chars for stability
    
    console.log(`[PDF] Sending to Gemini for reasoning...`);
    const summary = await runGemini(geminiPrompt);

    // 4. Grok Telugu Simplification
    console.log(`[PDF] Sending to Grok for Telugu conversion...`);
    const teluguSummary = await runGrok(summary);

    let storedDocumentUrl: string | undefined;
    let storedReportUrl: string | undefined;

    try {
      const documentUpload = await storage.uploadBuffer(
        `pdf_${Date.now()}_${req.file.originalname || 'document.pdf'}`,
        req.file.buffer,
        req.file.mimetype || 'application/pdf'
      );
      storedDocumentUrl = documentUpload.url;

      const reportBuffer = Buffer.from(
        JSON.stringify({
          summary,
          teluguSummary,
          sourceFilename: req.file.originalname,
          createdAt: new Date().toISOString(),
        }, null, 2),
        'utf-8'
      );

      const reportUpload = await storage.uploadBuffer(
        `pdf_report_${Date.now()}.json`,
        reportBuffer,
        'application/json'
      );
      storedReportUrl = reportUpload.url;
    } catch (storageError) {
      console.warn('[PDF] Storage upload failed, continuing without persisted asset:', storageError);
    }

    res.status(200).json({
      status: 'success',
      summary,
      teluguSummary,
      storedDocumentUrl,
      storedReportUrl,
    });
  } catch (error) {
    next(error);
  }
};
