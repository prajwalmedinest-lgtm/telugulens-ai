import { API_BASE_URL } from './apiBase';

export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  teluguContent?: string;
  createdAt?: string;
}

export interface ChatResponse {
  status: string;
  response: string;
  conversationId: string;
}

export interface StreamMessageResponse {
  response: Response;
  conversationId?: string | null;
}

export interface HistoryResponse {
  status: string;
  messages: Message[];
}

export const chatApi = {
  sendMessage: async (message: string, conversationId?: string): Promise<ChatResponse> => {
    const token = localStorage.getItem('telugulens_token');
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ message, conversationId }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  },

  streamMessage: async (message: string, conversationId?: string): Promise<Response> => {
    const token = localStorage.getItem('telugulens_token');
    return fetch(`${API_BASE_URL}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ message, conversationId }),
    });
  },

  getHistory: async (conversationId: string): Promise<HistoryResponse> => {
    const token = localStorage.getItem('telugulens_token');
    const response = await fetch(`${API_BASE_URL}/history/${conversationId}`, {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    return response.json();
  },
};
