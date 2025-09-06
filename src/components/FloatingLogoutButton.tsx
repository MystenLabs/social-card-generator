import React from 'react';
import { useAuth } from '@/context/useAuth';

const FloatingLogoutButton: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="fixed bottom-2 right-2 z-50">
      <button
        onClick={handleLogout}
        className="group flex aspect-square scale-75 items-center gap-2 rounded-full bg-red-600/20 px-4 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-red-700/20 hover:shadow-xl"
        title={`Logout ${user?.username || 'user'}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16,17 21,12 16,7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingLogoutButton;
