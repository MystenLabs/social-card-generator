import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { AuthContextType, User } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const auth = urlParams.get('auth');
    const userParam = urlParams.get('user');

    if (auth === 'success' && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam)) as User;
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));

        // Clean up URL
        const url = new URL(window.location.href);
        url.searchParams.delete('auth');
        url.searchParams.delete('user');
        window.history.replaceState({}, document.title, url.toString());
      } catch (error) {
        console.error('Failed to parse user data from callback', error);
      }
    } else if (auth === 'error') {
      const message = urlParams.get('message') || 'Authentication failed';
      console.error('Auth error:', message);
      alert(`Login failed: ${message}`);

      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('auth');
      url.searchParams.delete('message');
      window.history.replaceState({}, document.title, url.toString());
    } else {
      // Check for existing session on mount
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          parsedUser.profileImageUrl = parsedUser.profileImageUrl?.replace('_normal', '');
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse user data from sessionStorage', error);
          sessionStorage.removeItem('user');
        }
      }
    }

    setIsLoading(false);

    // Listen for automatic logout events from axios interceptor
    const handleAutoLogout = () => {
      setUser(null);
    };

    window.addEventListener('auth:logout', handleAutoLogout);

    return () => {
      window.removeEventListener('auth:logout', handleAutoLogout);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
