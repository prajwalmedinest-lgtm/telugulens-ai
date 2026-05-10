import { Request, Response, NextFunction } from 'express';
import { TTSService } from '../services/tts.service.js';
import { storage } from '../services/storage.service.js';

export const ttsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ status: 'error', message: 'Text is required for voice generation' });
      return;
    }

    const audioBuffer = await TTSService.generateVoice(text);

    try {
      await storage.uploadBuffer(
        `tts_${Date.now()}.mp3`,
        audioBuffer,
        'audio/mpeg'
      );
    } catch (storageError) {
      console.warn('[TTS] Storage upload failed, continuing with streaming response:', storageError);
    }

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
    });

    res.send(audioBuffer);
  } catch (error) {
    next(error);
  }
};
