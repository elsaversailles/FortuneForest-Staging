import { useState } from 'react';
import { fortuneForest_backend } from 'declarations/fortuneForest_backend';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    fortuneForest_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow overflow-y-auto pt-16">
        <Toaster position="top-center" reverseOrder={false} />
        <LandingPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;