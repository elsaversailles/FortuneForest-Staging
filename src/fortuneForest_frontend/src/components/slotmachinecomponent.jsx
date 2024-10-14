import React, { useEffect, useRef, useState } from 'react';
import '../CSS/slotmachinecss.css';
import { gsap } from 'gsap';

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
<div>
      <div className="flex justify-center">
        <div
          className="w-800 h-180 bg-cover bg-center bg-no-repeat flex justify-center items-center text-black text-lg"
          style={{ backgroundImage: "url('image/slotborder.png')" }}
        >
          <div className="results flex flex-col justify-center items-center">
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

          <div className="row holdcontrols flex max-w-[465px] mx-auto mt-0">
            {['ring1', 'ring2', 'ring3'].map((ring, index) => (
              <div key={index} className="col flex-none max-w-[calc(33.333333333%-2px)]">
                <button data-controls={ring} id={`hold${index + 1}`} className="hold bg-gray-300 text-black px-5 py-2 rounded">
                  Hold
                </button>
              </div>
            ))}
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
