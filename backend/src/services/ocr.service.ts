import { createWorker } from 'tesseract.js';

export class OCRService {
  static async runOCR(imageBuffer: Buffer): Promise<string> {
    const worker = await createWorker(['eng', 'tel']);
    try {
      const { data: { text } } = await worker.recognize(imageBuffer);
      return text;
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error('Failed to perform OCR');
    } finally {
      try {
        await worker.terminate();
      } catch (e) {
        // ignore
      }
    }
  }
}
