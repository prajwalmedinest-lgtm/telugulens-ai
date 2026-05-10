import { Request, Response, NextFunction } from 'express';
import { PDFService } from '../services/pdf.service.js';
import { OCRService } from '../services/ocr.service.js';
import { HospitalService } from '../services/hospital.service.js';
import { storage } from '../services/storage.service.js';

export const analyzeMedicalDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ status: 'error', message: 'No file uploaded' });
      return;
    }

    let extractedText = '';

    if (req.file.mimetype === 'application/pdf') {
      console.log(`[Medical] Parsing PDF: ${req.file.originalname}`);
      extractedText = await PDFService.extractText(req.file.buffer);
      
      // Fallback to OCR if PDF has very little text
      if (extractedText.trim().length < 50) {
        console.log('[Medical] Scanned PDF detected (low text density).');
        // Note: Full PDF-to-Image OCR would go here in a full prod app.
        // For now, we inform the user if extraction failed or try OCR on the buffer if it's an image.
      }
    } else if (req.file.mimetype.startsWith('image/')) {
      console.log(`[Medical] Running OCR on image: ${req.file.originalname}`);
      extractedText = await OCRService.runOCR(req.file.buffer);
    }

    if (!extractedText.trim()) {
      res.status(400).json({ 
        status: 'error', 
        message: 'Could not extract any text from the document. Please ensure it is clear and readable.' 
      });
      return;
    }

    const result = await HospitalService.explainMedicalDocument(extractedText);

    let storedDocumentUrl: string | undefined;
    let storedReportUrl: string | undefined;

    try {
      const documentUpload = await storage.uploadBuffer(
        `medical_${Date.now()}_${req.file.originalname || 'document'}`,
        req.file.buffer,
        req.file.mimetype
      );
      storedDocumentUrl = documentUpload.url;

      const reportBuffer = Buffer.from(
        JSON.stringify({
          ...result,
          sourceFilename: req.file.originalname,
          createdAt: new Date().toISOString(),
        }, null, 2),
        'utf-8'
      );

      const reportUpload = await storage.uploadBuffer(
        `medical_report_${Date.now()}.json`,
        reportBuffer,
        'application/json'
      );
      storedReportUrl = reportUpload.url;
    } catch (storageError) {
      console.warn('[Medical] Storage upload failed, continuing without persisted asset:', storageError);
    }

    res.status(200).json({
      status: 'success',
      ...result,
      storedDocumentUrl,
      storedReportUrl,
    });
  } catch (error) {
    next(error);
  }
};
