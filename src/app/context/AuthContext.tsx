import React, { createContext, useContext, useState, useEffect } from 'react';

import { authApi, UserProfile } from '../../services/authApi';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = authApi.getToken();
    const savedUser = authApi.getUser();
    if (token && savedUser) {
      setUser({ name: savedUser.fullName, email: savedUser.email });
      setIsAuthenticated(true);
      return;
    }

    // Try to refresh session
    (async () => {
      try {
        const profile: UserProfile = await authApi.me();
        authApi.setUser(profile);
        setUser({ name: profile.fullName, email: profile.email });
        setIsAuthenticated(true);
      } catch (err) {
        authApi.setToken(null);
        authApi.setUser(null);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const { success, data } = await authApi.login(email, password);
    if (!success) throw new Error(data?.message || 'Login failed');
    
    authApi.setToken(data.token);
    authApi.setUser(data.user);
    setUser({ name: data.user.fullName, email: data.user.email });
    setIsAuthenticated(true);
  };

  const signup = async (name: string, email: string, password: string) => {
    const { success, data } = await authApi.signup(name, email, password);
    if (!success) throw new Error(data?.message || 'Signup failed');

    authApi.setToken(data.token);
    authApi.setUser(data.user);
    setUser({ name: data.user.fullName, email: data.user.email });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    authApi.setToken(null);
    authApi.setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
