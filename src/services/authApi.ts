import { API_BASE_URL } from './apiBase';

const TOKEN_KEY = 'telugulens_token';
const USER_KEY = 'telugulens_user';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const authApi = {
  setToken: (token: string | null) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  },
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setUser: (user: any | null) => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  },
  getUser: (): UserProfile | null => {
    const s = localStorage.getItem(USER_KEY);
    return s ? JSON.parse(s) : null;
  },

  signup: async (fullName: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  me: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
};
