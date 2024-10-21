import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const wheelContainer = css`
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
}

body {
  display: grid;
  place-items: center;
  overflow: hidden;
}

.deal-wheel {
  --size: clamp(250px, 80vmin, 700px);
  --lg-hs: 0 3%;
  --lg-stop: 50%;
  --lg: linear-gradient(
      #295113 0 var(--lg-stop),
      #a4c11b var(--lg-stop) 100%
    );
  
  position: relative;
  display: grid;
  align-items: center;
  grid-template-areas:
    "spinner"
    "message"
    "trigger";
  font-family: "Girassol", sans-serif;
  font-size: calc(var(--size) / 25);
  line-height: 1;
  text-transform: none;
  justify-content: center;
  overflow: hidden;
  
}

.deal-wheel > * {
  grid-area: spinner;
}

.deal-wheel .btn-spin {
  grid-area: trigger;
  justify-self: center;
}

.prize-message {
  grid-area: message;
  text-transform: none;
  text-align: center;
  font-size: calc(var(--size) / 25);
  color: #333;
  font-weight: bold;
}
.spinner {
  position: relative;
  display: grid;
  align-items: center;
  grid-template-areas: "spinner";
  width: var(--size);
  height: var(--size);
  transform: rotate(calc(var(--rotate, 25) * 1deg));
  border-radius: 50%;
  box-shadow: inset 0 0 0 calc(var(--size) / 40) hsl(0deg 0% 0% / 0.06);
  border: solid;
  padding-left: 0px;
  transition: transform 8s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.spinner * {
  grid-area: spinner;
}

.prize {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 calc(var(--size) / 6) 0 calc(var(--size) / 20);
  width: 50%;
  height: 50%;
  transform-origin: center right;
  transform: rotate(var(--rotate));
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.cap {
  --cap-size: calc(var(--size) / 4);
  position: relative;
  justify-self: center;
  width: var(--cap-size);
  height: var(--cap-size);
}

/* Hide select dropdown from SVG import file */
.cap select {
  display: none;
}

.cap svg {
  width: 100%;
}

.ticker {
  position: relative;
  left: calc(var(--size) / -15);
  width: calc(var(--size) / 10);
  height: calc(var(--size) / 20);
  background: var(--lg);
  z-index: 1;
  -webkit-clip-path: polygon(20% 0, 100% 50%, 20% 100%, 0% 50%);
          clip-path: polygon(20% 0, 100% 50%, 20% 100%, 0% 50%);
  transform-origin: center left;\
  display: none;
}

.midIcon {
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.btn-spin {
  text-align: center;
  display: inline-block;
  border-radius: 50px;
  font-size: 1em;
  padding: 10px 15px;
  background-color: #78C6B6;
  border: 2px solid #20223B;
  color: #20223B;
  transition: all 0.2s ease;
  font-weight: 500;
  font-family: 'Ubuntu', sans-serif;
  box-shadow: 0 4px 0 #20223B, 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.btn-spin:focus {
  outline-offset: 2px;
}

.btn-spin:active {
  transform: translateY(1px);
}

.btn-spin:disabled {
  cursor: progress;
  opacity: 0.25;
}

/* Spinning animation */
.is-spinning .spinner {
  transition: transform 8s cubic-bezier(0.1, -0.01, 0, 1);
}

.is-spinning .ticker {
  -webkit-animation: tick 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: tick 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@-webkit-keyframes tick {
  40% {
    transform: rotate(-12deg);
  }
}

@keyframes tick {
  40% {
    transform: rotate(-12deg);
  }
}

/* Selected prize animation */
.prize.selected .text {
  color: white;
  -webkit-animation: selected 800ms ease;
          animation: selected 800ms ease;
}

@-webkit-keyframes selected {
  25% {
    transform: scale(1.25);
    text-shadow: 1vmin 1vmin 0 hsla(0 0% 0% / 0.1);
  }
  40% {
    transform: scale(0.92);
    text-shadow: 0 0 0 hsla(0 0% 0% / 0.2);
  }
  60% {
    transform: scale(1.02);
    text-shadow: 0.5vmin 0.5vmin 0 hsla(0 0% 0% / 0.1);
  }
  75% {
    transform: scale(0.98);
  }
  85% {
    transform: scale(1);
  }
}

@keyframes selected {
  25% {
    transform: scale(1.25);
    text-shadow: 1vmin 1vmin 0 hsla(0 0% 0% / 0.1);
  }
  40% {
    transform: scale(0.92);
    text-shadow: 0 0 0 hsla(0 0% 0% / 0.2);
  }
  60% {
    transform: scale(1.02);
    text-shadow: 0.5vmin 0.5vmin 0 hsla(0 0% 0% / 0.1);
  }
  75% {
    transform: scale(0.98);
  }
  85% {
    transform: scale(1);
  }
}
`;

const SpinningWheelComponent = () => {
  const prizes = [
    { text: "100 TREEPOINTS", color: "#c1fe75" },
    { text: "50 TREEPOINTS", color: "#aafde3" },
    { text: "BETTER LUCK NEXT TIME", color: "#fdc161" },
    { text: "100 TREEPOINTS", color: "#c1fe75" },
    { text: "50 TREEPOINTS", color: "#aafde3" },
    { text: "BETTER LUCK NEXT TIME", color: "#fdc161" },
    { text: "100 TREEPOINTS", color: "#c1fe75" },
    { text: "50 TREEPOINTS", color: "#aafde3" },
    { text: "BETTER LUCK NEXT TIME", color: "#fdc161" },
  ];

  const wheelRef = useRef(null);
  const spinnerRef = useRef(null);
  const tickerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [prizeMessage, setPrizeMessage] = useState("Press Button to Spin");
  const [isSpinning, setIsSpinning] = useState(false);

  const prizeSlice = 360 / prizes.length;
  const prizeOffset = Math.floor(180 / prizes.length);

  const createPrizeNodes = () => {
    return prizes.map(({ text, color }, i) => {
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      return (
        <li key={i} className="prize" style={{ '--rotate': `${rotation}deg` }}>
          <span className="text">{text}</span>
        </li>
      );
    });
  };

  const createConicGradient = () => {
    if (spinnerRef.current) {
      spinnerRef.current.style.background = `conic-gradient(
        from -90deg,
        ${prizes.map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`).reverse()}
      )`;
    }
  };

  const selectPrize = () => {
    // Normalize rotation to ensure it's within 0-360 degrees
    const normalizedRotation = rotation % 360;
  
    // Adjust the angle for the ticker's position
    // If the ticker points to the top of the wheel, add an offset to find the correct prize
    const angleFromTicker = (normalizedRotation + 90) % 360; // Adjust based on your design
  
    const selected = Math.floor(angleFromTicker / prizeSlice) % prizes.length; // Calculate selected prize
    
    // Get the prize text
    const prizeWon = prizes[selected].text;
  
    // Update the prize message based on the selected prize
    if (prizeWon.includes("100 TREEPOINTS")) {
      setPrizeMessage("Congratulations! You won 100 TREEPOINTS!");
    } else if (prizeWon.includes("50 TREEPOINTS")) {
      setPrizeMessage("Congratulations! You won 50 TREEPOINTS!");
    } else {
      setPrizeMessage("Better luck next time!");
    }
  
    // Highlight the selected prize
    const prizeElements = spinnerRef.current.children; // Get prize elements
    Array.from(prizeElements).forEach((prize, index) => {
      prize.classList.remove('selected'); // Remove highlight from all prizes
      if (index === selected) {
        prize.classList.add('selected'); // Highlight the selected prize
      }
    });
  };
  

  const spinertia = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSpin = () => {
    setPrizeMessage("Spinning...");
    setIsSpinning(true);
    const newRotation = rotation + Math.floor(Math.random() * 360 + spinertia(2000, 5000));
    setRotation(newRotation);
  
    setTimeout(() => {
      setIsSpinning(false);
      selectPrize();
    }, 8000);
  };

  useEffect(() => {
    createConicGradient();
  }, []);

  return (
    <div css={wheelContainer}>
      <div className={`deal-wheel ${isSpinning ? 'is-spinning' : ''}`} ref={wheelRef}>
      <ul className="spinner" ref={spinnerRef} style={{ transform: `rotate(${rotation}deg)` }}>
        {createPrizeNodes()}
      </ul>
        <figure className="cap">
          <img className="midIcon" src="image/wheelicon.png" alt="Wheel Icon" />
        </figure>
        <div className="ticker" ref={tickerRef} ></div>
        <div className="prize-message">{prizeMessage}</div>
        <button className="btn-spin" onClick={handleSpin} disabled={isSpinning}>
          {isSpinning ? "Spinning..." : "Spin the Wheel"}
        </button>
      </div>
    </div>
  );
};

export default SpinningWheelComponent;
