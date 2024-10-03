import { useState } from 'react';
import { fortuneForest_backend } from 'declarations/fortuneForest_backend';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

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
    <div>
      <LandingPage />
      <div className="relative z-10">
        <Header />
    </div>
  </div>
  );
}

export default App;
