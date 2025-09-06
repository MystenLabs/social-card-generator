import React, { ReactNode } from 'react';

import FloatingLogoutButton from '../FloatingLogoutButton';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-white">
      <Header />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
      <FloatingLogoutButton />
    </div>
  );
};

export default Layout;
