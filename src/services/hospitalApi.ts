import { API_BASE_URL } from './apiBase';

export interface HospitalAnalysisResponse {
  status: string;
  medicalExplanation: string;
  teluguExplanation: string;
  disclaimer: string;
}

export const hospitalApi = {
  uploadDocument: async (file: File): Promise<HospitalAnalysisResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('telugulens_token');
    const response = await fetch(`${API_BASE_URL}/hospital`, {
      method: 'POST',
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze medical document');
    }

    return response.json();
  },
};
