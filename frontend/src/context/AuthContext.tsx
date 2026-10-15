import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Profile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginDemoUser: () => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('skillpilot_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUserData = async () => {
    if (!localStorage.getItem('skillpilot_token')) {
      setIsLoading(false);
      return;
    }
    try {
      const userData = await api.getMe();
      setUser(userData);
      setProfile(userData.profile);
    } catch (err) {
      console.error('Failed to load user session:', err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await api.login({ email, password });
    localStorage.setItem('skillpilot_token', res.access_token);
    setToken(res.access_token);
    setUser(res.user);
    await refreshUserData();
  };

  const loginDemoUser = async () => {
    await login('alex@skillpilot.ai', 'password123');
  };

  const register = async (data: any) => {
    setIsLoading(true);
    const res = await api.register(data);
    localStorage.setItem('skillpilot_token', res.access_token);
    setToken(res.access_token);
    setUser(res.user);
    await refreshUserData();
  };

  const logout = () => {
    localStorage.removeItem('skillpilot_token');
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        loginDemoUser,
        register,
        logout,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
