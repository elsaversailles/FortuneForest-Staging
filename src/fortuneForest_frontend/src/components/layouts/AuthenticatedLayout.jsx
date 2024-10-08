import React from 'react';
import Header from '../Header';

const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />
      <div className="flex flex-grow">
        <aside className="w-64 bg-green-100 p-4">
          {/* Add sidebar navigation here */}
          <nav>
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;