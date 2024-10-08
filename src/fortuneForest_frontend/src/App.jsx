import { useState } from 'react';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} user={user} />
      <div className="flex-grow overflow-y-auto pt-16">
        <Toaster position="top-center" reverseOrder={false} />
        {isAuthenticated ? (
          <Dashboard user={user} />
        ) : (
          <LandingPage onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
