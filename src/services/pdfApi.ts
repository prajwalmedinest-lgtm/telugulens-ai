import { API_BASE_URL } from './apiBase';

export interface PDFAnalysisResponse {
  status: string;
  summary: string;
  teluguSummary: string;
}

export const pdfApi = {
  uploadPDF: async (file: File): Promise<PDFAnalysisResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('telugulens_token');
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze PDF');
    }

    return response.json();
  },
};
