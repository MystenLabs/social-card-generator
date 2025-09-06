import { useState } from 'react';
import getAuthUrl from '@/api/auth/getAuthUrl';

import Button from '@/components/button';
import LandingBackground from '@/components/landing/LandingBackground';

const Login = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoginLoading(true);
      const authUrl = await getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Login failed:', error);
      alert('Failed to initiate login. Please try again.');
      setIsLoginLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col overflow-x-clip">
        {/* Top section with login */}
        <div className="flex w-full flex-col-reverse items-center justify-center gap-8 pb-12 pt-8 md:flex-col md:pb-16">
          <div className="flex w-full flex-col items-center justify-center px-5 md:px-0">
            <div className="w-full max-w-2xl pb-6 text-center text-xl font-medium leading-tight lg:text-[40px]">
              <p>Log in to create your personalized</p>
              <p>#SuiFest Card</p>
            </div>

            <Button
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              }
              onClick={handleLogin}
              disabled={isLoginLoading}
            >
              {isLoginLoading ? 'Loading...' : <>Login with</>}
            </Button>

            <p className="mt-4 text-center text-base font-normal leading-tight md:text-lg">
              Haven’t registered? Register for SuiFest here:{' '}
              <a
                className="text-blue-500 underline"
                href="https://luma.com/SuiFest"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://luma.com/SuiFest
              </a>
            </p>
          </div>

          <LandingBackground />
        </div>
      </div>
    </div>
  );
};

export default Login;
