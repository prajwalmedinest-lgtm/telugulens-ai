import { API_BASE_URL } from './apiBase';

export interface STTResponse {
  success: boolean;
  data?: {
    transcript: string;
  };
  error?: string;
}

export const sttApi = {
  transcribeAudio: async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData();
    const file = new File([audioBlob], `recording.${audioBlob.type.includes('webm') ? 'webm' : 'wav'}`, {
      type: audioBlob.type || 'audio/webm',
    });
    formData.append('audio', file);

    const token = localStorage.getItem('telugulens_token');
    const response = await fetch(`${API_BASE_URL}/stt`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const payload = (await response.json()) as STTResponse;
    if (!response.ok || !payload.success || !payload.data?.transcript) {
      throw new Error(payload.error || 'Failed to transcribe audio');
    }

    return payload.data.transcript;
  },
};
