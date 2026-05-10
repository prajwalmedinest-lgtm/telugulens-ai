import { createRequire } from 'module';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';
import { OCRService } from './ocr.service.js';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export class PDFService {
  static async extractText(buffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(buffer);
      const text = typeof data?.text === 'string' ? data.text : '';

      if (text.trim().length > 50) {
        return text;
      }

      // If the PDF is scanned or mostly image-based, rasterize pages and OCR them.
      const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'telugulens-pdf-'));
      const pdfPath = path.join(tmpDir, 'input.pdf');
      await fs.promises.writeFile(pdfPath, buffer);

      try {
        execSync(`pdftoppm -png -r 150 "${pdfPath}" "${path.join(tmpDir, 'page')}"`, { stdio: 'ignore' });

        const files = (await fs.promises.readdir(tmpDir))
          .filter((file) => file.endsWith('.png'))
          .sort();

        let ocrText = '';
        for (const file of files) {
          const imgPath = path.join(tmpDir, file);
          const imgBuffer = await fs.promises.readFile(imgPath);
          try {
            const pageText = await OCRService.runOCR(imgBuffer);
            ocrText += `\n${pageText}`;
          } catch (ocrError) {
            console.warn('[PDF] OCR failed for page', file, ocrError);
          }
        }

        return ocrText.trim() || text;
      } catch (ocrFallbackError) {
        console.warn('[PDF] Scanned PDF OCR fallback failed, returning raw text', ocrFallbackError);
        return text;
      } finally {
        try {
          const cleanupFiles = await fs.promises.readdir(tmpDir);
          await Promise.all(cleanupFiles.map((file) => fs.promises.unlink(path.join(tmpDir, file)).catch(() => undefined)));
          await fs.promises.rmdir(tmpDir).catch(() => undefined);
        } catch {
          // ignore cleanup errors
        }
      }
    } catch (error) {
      console.error('PDF Extraction Error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }
}
