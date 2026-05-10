import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import OpenAI from 'openai';
import { env } from '../config/env.js';

const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

export const transcribeSpeech = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!client) {
      res.status(501).json({ success: false, error: 'STT is not configured. Set OPENAI_API_KEY.' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ success: false, error: 'Audio file is required' });
      return;
    }

    const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'stt-'));
    const filePath = path.join(tmpDir, req.file.originalname || 'audio.webm');
    await fs.promises.writeFile(filePath, req.file.buffer);

    const transcript = await client.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
      language: 'te',
    });

    try {
      await fs.promises.unlink(filePath);
      await fs.promises.rmdir(tmpDir);
    } catch (cleanupError) {
      // ignore cleanup failures
    }

    res.status(200).json({ success: true, data: { transcript: transcript.text } });
  } catch (error) {
    next(error);
  }
};
