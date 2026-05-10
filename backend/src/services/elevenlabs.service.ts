import { env } from "../config/env.js";

export class ElevenLabsService {
  private static apiKey = env.ELEVENLABS_API_KEY;
  private static baseUrl = "https://api.elevenlabs.io/v1";

  static async textToSpeech(text: string, voiceId: string = "pNInz6obpgmqS29p5m4R"): Promise<ArrayBuffer> {
    try {
      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": this.apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`ElevenLabs API Error: ${errorData.detail?.message || response.statusText}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error("ElevenLabs Service Error:", error);
      throw error;
    }
  }
}
