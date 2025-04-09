"use client";

import { useEffect, useState } from 'react';

function PortfolioCreationPage() {
  const [typedText, setTypedText] = useState('');
  const [showCaret, setShowCaret] = useState(true);
  const fullText = "Create your own AI-enhanced portfolio with ease.";

  useEffect(() => {
    // Typing animation
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        // Start blinking caret animation after typing completes
        const caretInterval = setInterval(() => {
          setShowCaret(prev => !prev);
        }, 500);
        return () => clearInterval(caretInterval);
      }
    }, 50); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="h-screen flex items-center justify-between bg-gray-50 p-8 md:p-16 overflow-hidden">
      <div className="max-w-2xl" style={{ marginRight: '-100px' }}>
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-gray-800 mb-4">
          Create your
          <br />
          <span className="text-blue-600">Portfolio</span>
        </h1>
        
        <p className="text-2xl text-gray-600 mb-8 h-10">
          {typedText}
          <span className={`inline-block w-1 h-7 bg-blue-500 align-middle ${showCaret ? 'opacity-100' : 'opacity-0'}`}></span>
        </p>
        
<<<<<<< Updated upstream
=======
        <Link href="/portfolio_creation_page/name">
>>>>>>> Stashed changes
        <button className="
          bg-blue-600 
          hover:bg-blue-700 
          hover:scale-105 
          active:bg-blue-500 
          active:scale-100 
          text-white 
          font-semibold 
          py-3 px-6
          md:py-4 md:px-8 
          rounded-lg 
          shadow-md 
          transition-all 
          duration-300 
          text-lg
          md:text-xl 
          cursor-pointer
          transform
        ">
          Get started
        </button>
<<<<<<< Updated upstream
=======
        </Link>
>>>>>>> Stashed changes
      </div>
      
      <div className="relative hidden lg:block" style={{ 
        width: '1100px', 
        height: '1100px', 
        flexShrink: 0, 
        top: '-50px',
        position: 'fixed',
        right: '0px',
      }}>
        <img 
          src="/gear.svg" 
          alt="Gear Logo"
          className="absolute w-full h-full animate-[spin_20s_linear_infinite] opacity-40"
        />
        <img 
          src="/G.svg" 
          alt="Gear G"
          className="absolute w-full h-full opacity-50"
        />
      </div>
    </div>
  );
}

export default PortfolioCreationPage;