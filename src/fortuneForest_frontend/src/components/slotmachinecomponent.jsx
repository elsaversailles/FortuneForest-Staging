import React, { useEffect, useRef, useState } from 'react';
// import '../CSS/slotmachinecss.css';
import { gsap } from 'gsap';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const slotMachineStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  html,
  body {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
  }

  svg,
  ul,
  li,
  .container {
    position: absolute;
  }

  .stage {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 460px;
    position: relative;
  }

  .results,
  .button-area {
    padding: 20px 0;
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .results {
    margin: 0;
  }

  .button-area {
    margin-bottom: 0;
  }

  button {
    text-align: center;
    display: inline-block;
    border-radius: 50px;
    font-size: 1.5em;
    padding: 10px 55px;
    background-color: #78c6b6; /* Button background color */
    border: 2px solid #20223b; /* Dark border for 3D contrast */
    color: #20223b; /* Text color */
    transition: all 0.2s ease;
    font-weight: 500;
    font-family: 'Ubuntu', sans-serif;
    box-shadow: 0 4px 0 #20223b, 0 4px 8px rgba(0, 0, 0, 0.2); /* 3D shadow */
  }

  button:hover,
  button:focus-visible {
    background: white;
    color: #16a085;
    border-color: #16a085;
  }

  .ring,
  .item,
  .console-outer {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    user-select: none;
  }

  .row.console {
    flex: 1 1 auto;
    display: flex;
    max-height: 520px;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .console-outer {
    max-height: 460px;
    min-height: 130px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    max-width: 600px;
    margin: auto;
    margin-bottom: 0;
    margin-top: 0;
    gap: 0;
  }

  .col.wheel {
    padding: 0 40px;
    max-height: 430px;
    min-height: 130px;
    height: 100%;
    overflow: hidden;
    margin: auto;
    flex: 0 0 calc(33.333333333% - 2px);
    max-width: calc(33.333333333% - 2px);
    position: relative;
  }

  .console-outer:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: " ";
  }

  .container {
    perspective: 2000px;
    width: 130px;
    height: 130px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: relative;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .item {
    display: flex;
    justify-content: center;
    vertical-align: center;
    margin: auto;
    border: 1px solid transparent;
    border-radius: 50%;
    backface-visibility: hidden;
    background: transparent;
    opacity: 0.8;
  }

  .item span {
    font-size: 2.5em;
    margin: auto;
  }

  .item.active {
    box-shadow: inset 0px 0 10px 0px #ecd820b0 !important;
    opacity: 1 !important;
  }

  .results {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .results div {
    font-size: 20px;
    text-align: center;
    color: black;
  }

  .stage.notstarted .active {
    box-shadow: none;
  }

  .holdcontrols {
    max-width: 465px;
    width: 100%;
    display: flex;
    margin: auto;
    margin-top: 0;
  }

  .holdcontrols .col {
    padding: 10px 0;
    padding-top: 0;
    text-align: center;
    flex: 0 0 calc(33.333333333% - 2px);
    max-width: calc(33.333333333% - 2px);
  }

  .holdcontrols button {
    font-size: 1em;
    padding: 5px 25px;
  }

  .holdcontrols button.held {
    background: #16a085;
    color: white;
    border-color: #16a085;
  }
`;

const SlotMachineComponent = () => {
    const [textContent, setTextContent] = useState('Press Button to start?');
    const [winningChanceActive, setWinningChanceActive] = useState(false);
    const [heldRings, setHeldRings] = useState([false, false, false]);
    const ringsRef = useRef([]);
  
    // Function to generate random values for initial spin
    const generateRandom = () => gsap.utils.random(-360, 360, 45);
    
    const items = useRef([]);
  
    useEffect(() => {
      // Initial spin on component mount, but ensure no items are active
      const random1 = generateRandom();
      const random2 = generateRandom();
      const random3 = generateRandom();
  
      gsap.timeline()
        .set('.ring', { rotationX: -90 })
        .set('.item', {
          rotateX: (i) => (i * -45),
          transformOrigin: '50% 50% -220px',
          z: 220,
        })
        .to('#ring1', { rotationX: random1, duration: 1, ease: 'power3' }, '<=')
        .to('#ring2', { rotationX: random2, duration: 1.5, ease: 'power3' }, '<=')
        .to('#ring3', { rotationX: random3, duration: 2, ease: 'power3' }, '<=');
  
      // Ensure no item is active at initial load
      ringsRef.current.forEach(ring => {
        ring.querySelectorAll('.item').forEach(item => item.classList.remove('active'));
      });
    }, []);
  
    const checkBonus = () => {
      let threshold = 0.001 * 0.001; // Modify based on multiplier
      return Math.random() < threshold;
    };
  
    function finishScroll() {
      const cols = ['#ring1', '#ring2', '#ring3'];
      
      cols.forEach((colId, index) => {
        const col = document.querySelector(colId);
        if (!col) return;
  
        const items = col.querySelectorAll('.item');
        const rotationX = gsap.getProperty(col, 'rotationX');
        const itemHeight = 45; // Each item's height or rotation step in degrees
        const itemIndex = Math.round((rotationX % 360) / itemHeight) % items.length;
  
        const activeIndex = (itemIndex + items.length) % items.length;
        items.forEach(item => item.classList.remove('active'));
  
        const activeItem = items[activeIndex];
        activeItem.classList.add('active');
      });
  
      const activeItem1 = document.querySelector("#col1 .item.active")?.getAttribute('data-content');
      const activeItem2 = document.querySelector("#col2 .item.active")?.getAttribute('data-content');
      const activeItem3 = document.querySelector("#col3 .item.active")?.getAttribute('data-content');
  
      if (activeItem1 && activeItem2 && activeItem3) {
        if (activeItem1 === activeItem2 && activeItem2 === activeItem3) {
          setTextContent(`You won, woohoo! Everyone gets ${activeItem1}s!`);
        } else if (activeItem1 !== activeItem2 && activeItem2 !== activeItem3 && activeItem1 !== activeItem3) {
          setTextContent('Bad luck, you lost');
        } else {
          let sameItem = activeItem1 === activeItem2 ? activeItem1 : activeItem2 === activeItem3 ? activeItem3 : activeItem1;
          setTextContent(`Close but no ${sameItem}s for you. Why not try again?`);
        }
      }
    }
  
    const handleSpin = () => {
        setTextContent('Round and round it goes...');
      
        // Clear active items before starting the spin
        ringsRef.current.forEach(ring => {
          ring.querySelectorAll('.item').forEach(item => item.classList.remove('active'));
        });
      
        // Reset holds before spinning
        setHeldRings([false, false, false]); 
      
        setWinningChanceActive(checkBonus());
      
        let randomValues = [];
        if (winningChanceActive) {
          const baseValue = gsap.utils.random(-1440, 1440, 45);
          randomValues = [baseValue, baseValue, baseValue];
        } else {
          randomValues = [
            gsap.utils.random(-1440, 1440, 45),
            gsap.utils.random(-1440, 1440, 45),
            gsap.utils.random(-1440, 1440, 45),
          ];
        }
      
        const scrollTimeline = gsap.timeline({
          onComplete: finishScroll // Finish the spin, then activate items
        });
      
        randomValues.forEach((value, index) => {
          if (!heldRings[index]) {
            scrollTimeline.to(`#ring${index + 1}`, {
              rotationX: value,
              duration: (index + 2), // Different durations for a realistic spin
              ease: 'power3',
            }, '<');
          }
        });
      
        scrollTimeline.play();
      };
      
  return (
<div css={slotMachineStyles}>
      <div className="min-h-44 flex justify-center">
                <div
                style={{
                  width: '700px',
                  height: '180px',
                  backgroundImage: "url('image/slotborder.png')",
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'black',
                  fontSize: '18px',
                }}
          >
          <div>
            <div id="textcontent">{textContent}</div>
            </div>
        </div>
      </div>

      <div className="stage notstarted">
        <div className="row console flex flex-col justify-center max-h-[520px] w-full">
          <div className="console-outer flex relative mx-auto max-w-[600px]">
            <div className="arrow arrow-left absolute left-[-250px] top-1/2 transform -translate-y-1/2 z-100">
              <img src="image/arrow.png" alt="Left Arrow" className="w-[250px] h-auto" />
            </div>

            <div id="col1" className="col third wheel"><div className="container">
            <ul id="ring1" className="ring ring-transparent">
            <li data-content="coconut" className="item"><span><img src="image/reel-icon-1.png"/></span></li>
            <li data-content="double" className="item"><span><img src="image/reel-icon-2.png"/></span></li>
            <li data-content="free spin" className="item"><span><img src="image/reel-icon-3.png"/></span></li>
            <li data-content="grass" className="item"><span><img src="image/reel-icon-4.png"/></span></li>
            <li data-content="spurt" className="item"><span><img src="image/reel-icon-5.png"/></span></li>
            <li data-content="seed" className="item"><span><img src="image/reel-icon-6.png"/></span></li>
            <li data-content="tree" className="item"><span><img src="image/reel-icon-7.png"/></span></li>
            <li data-content="voucher" className="item"><span><img src="image/reel-icon-8.png"/></span></li>
            </ul>
            </div></div>


            <div className="divider w-[10px] bg-[#64CBBC] h-full"></div>

            <div id="col2" className="col third wheel"><div className="container">
            <ul id="ring2" className="ring ring-transparent">
            <li data-content="coconut" className="item"><span><img src="image/reel-icon-1.png"/></span></li>
            <li data-content="double" className="item"><span><img src="image/reel-icon-2.png"/></span></li>
            <li data-content="free spin" className="item"><span><img src="image/reel-icon-3.png"/></span></li>
            <li data-content="grass" className="item"><span><img src="image/reel-icon-4.png"/></span></li>
            <li data-content="spurt" className="item"><span><img src="image/reel-icon-5.png"/></span></li>
            <li data-content="seed" className="item"><span><img src="image/reel-icon-6.png"/></span></li>
            <li data-content="tree" className="item"><span><img src="image/reel-icon-7.png"/></span></li>
            <li data-content="voucher" className="item"><span><img src="image/reel-icon-8.png"/></span></li>
            </ul>
            </div></div>


                <div className="divider w-[10px] bg-[#64CBBC] h-full"></div>

                <div id="col3" className="col third wheel"><div className="container">
            <ul id="ring3" className="ring ring-transparent">
            <li data-content="coconut" className="item"><span><img src="image/reel-icon-1.png"/></span></li>
            <li data-content="double" className="item"><span><img src="image/reel-icon-2.png"/></span></li>
            <li data-content="free spin" className="item"><span><img src="image/reel-icon-3.png"/></span></li>
            <li data-content="grass" className="item"><span><img src="image/reel-icon-4.png"/></span></li>
            <li data-content="spurt" className="item"><span><img src="image/reel-icon-5.png"/></span></li>
            <li data-content="seed" className="item"><span><img src="image/reel-icon-6.png"/></span></li>
            <li data-content="tree" className="item"><span><img src="image/reel-icon-7.png"/></span></li>
            <li data-content="voucher" className="item"><span><img src="image/reel-icon-8.png"/></span></li>
            </ul>
            </div></div>


            <div className="arrow arrow-right absolute right-[-250px] top-1/2 transform -translate-y-1/2 z-10">
              <img src="image/arrow.png" alt="Right Arrow" className="w-[250px] h-auto transform scale-x-[-1]" />
            </div>
          </div>


        </div>
        <div className="button-area flex justify-center">
        <button onClick={handleSpin} className="trigger bg-[#78C6B6] text-[#20223B] rounded-full text-2xl py-2 px-[55px] border-2 border-[#20223B] transition-all duration-200 hover:bg-white hover:text-[#16a085] hover:border-[#16a085] shadow-[0_4px_0_#20223B,0_4px_8px_rgba(0,0,0,0.2)] font-ubuntu font-medium">
            Play!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotMachineComponent;
