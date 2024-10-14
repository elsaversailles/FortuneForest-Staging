import { useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Test from './components/Test'; //this

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    window.location.hash = '/dashboard';
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
            <Route path="/test" element={<Test />} /> {/* Add this route inside the Routes */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
