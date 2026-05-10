import { API_BASE_URL } from './apiBase';

export const ttsApi = {
  generateSpeech: async (text: string): Promise<Blob> => {
    const token = localStorage.getItem('telugulens_token');
    const response = await fetch(`${API_BASE_URL}/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate speech');
    }

    return response.blob();
  },
};
