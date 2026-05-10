import { ElevenLabsClient } from 'elevenlabs';
import { env } from '../config/env.js';
import crypto from 'crypto';
import { cache } from './cache.service.js';

const client = new ElevenLabsClient({
  apiKey: env.ELEVENLABS_API_KEY,
});

export class TTSService {
  static getHash(text: string, voice = 'default') {
    return crypto.createHash('sha256').update(`${voice}::${text}`).digest('hex');
  }

  static async generateVoice(text: string): Promise<Buffer> {
    try {
      const key = this.getHash(text, 'eleven_multilingual_v2');
      const cached = cache.get(key) as Buffer | null;
      if (cached) {
        console.log('[TTS] Returning cached audio');
        return cached as Buffer;
      }

      console.log(`[TTS] Generating voice for: ${text.substring(0, 50)}...`);
      const audio = await client.generate({
        voice: 'George', // You can change this to a preferred Telugu-capable voice
        text,
        model_id: 'eleven_multilingual_v2',
      });

      // ElevenLabs returns a stream, we need to convert it to a buffer
      const chunks: any[] = [];
      for await (const chunk of audio) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      // cache audio for 24 hours
      cache.set(key, buffer, 24 * 60 * 60 * 1000);

      return buffer;
    } catch (error) {
      console.error('ElevenLabs TTS Error:', error);
      throw new Error('Failed to generate voice');
    }
  }
}
