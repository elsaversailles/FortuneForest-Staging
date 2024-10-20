import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { Toaster } from "@/components/ui/toaster";
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import SlotMachine from './components/pages/SlotMachine';
import RedeemPage from './components/pages/RedeemPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    const storedUser = localStorage.getItem('user');
    if (sessionToken && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={isAuthenticated} user={user} />
        <div className="flex-grow overflow-y-auto pt-16">
        <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage onLoginSuccess={handleLoginSuccess} />
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/" />
            } />
            <Route path="/slotmachine" element={
              isAuthenticated ? <SlotMachine user={user} /> : <Navigate to="/" />
            } />
            <Route path="/redeem" element={
              isAuthenticated ? <RedeemPage user={user} /> : <Navigate to="/" />
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
