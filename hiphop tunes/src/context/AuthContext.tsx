import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    language: 'tamil' | 'english';
    theme: 'light' | 'dark';
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - replace with real authentication
    const mockUser: User = {
      id: '1',
      name: 'Music Lover',
      email,
      preferences: {
        language: 'tamil',
        theme: 'dark'
      }
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration - replace with real authentication
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      preferences: {
        language: 'tamil',
        theme: 'dark'
      }
    };
    setUser(mockUser);
  };

  const updatePreferences = (preferences: Partial<User['preferences']>) => {
    if (user) {
      setUser({ ...user, preferences: { ...user.preferences, ...preferences } });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register,
      updatePreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
};