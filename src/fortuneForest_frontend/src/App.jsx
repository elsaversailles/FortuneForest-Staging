import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Test from './components/Test';
// import SlotMachine from './components/pages/slotmachine';

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
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage onLoginSuccess={handleLoginSuccess} />
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/" />
            } />
            <Route path="/test" element={<Test />} />
            {/* <Route path="/slotmachine" element={
              isAuthenticated ? <SlotMachine user={user} /> : <Navigate to="/" />
            } /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
