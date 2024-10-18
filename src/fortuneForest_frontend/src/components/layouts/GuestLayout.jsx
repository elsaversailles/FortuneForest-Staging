import React from 'react';
import Header from '../Header';

const GuestLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default GuestLayout;