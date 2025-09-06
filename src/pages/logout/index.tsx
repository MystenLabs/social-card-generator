import { useEffect } from 'react';
import { useAuth } from '@/context/useAuth';
import { useNavigate } from '@tanstack/react-router';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically logout and redirect
    logout();

    // Small delay to show the logout message, then redirect to login
    const timer = setTimeout(() => {
      navigate({ to: '/login' });
    }, 1500);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '20px',
      }}
    >
      <h2>Logging out...</h2>
      <p>You have been successfully logged out.</p>
      <div>Redirecting to login page...</div>
    </div>
  );
};

export default Logout;
