import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const AuthenticatedLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
