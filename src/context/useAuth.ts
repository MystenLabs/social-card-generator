import { useContext } from 'react';

import { AuthContext } from './AuthContext';
import type { AuthContextType, User } from './types';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useSession = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  return {
    data: {
      user,
      status: isLoading ? 'loading' : isAuthenticated ? 'authenticated' : 'unauthenticated',
    },
    status: isLoading ? 'loading' : isAuthenticated ? 'authenticated' : 'unauthenticated',
  };
};

export type { User };
