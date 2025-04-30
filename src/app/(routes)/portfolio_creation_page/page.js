"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function PortfolioCreationPage() {
  const [typedText, setTypedText] = useState('');
  const [showCaret, setShowCaret] = useState(true);
  const fullText = "Create your own AI-enhanced portfolio with ease.";
  const router = useRouter();

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        const caretInterval = setInterval(() => {
          setShowCaret(prev => !prev);
        }, 500);
        return () => clearInterval(caretInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  const handleGetStarted = (e) => {
    e.preventDefault();
    router.push("/portfolio_creation_page/1_name");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex items-center justify-between bg-gray-50 p-8 md:p-16 overflow-hidden"
    >
      <motion.div 
        className="max-w-2xl" 
        style={{ marginRight: '-100px' }}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-gray-800 mb-4">
          Create your
          <br />
          <motion.span 
            className="text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Portfolio
          </motion.span>
        </h1>

        <p className="text-2xl text-gray-600 mb-8 h-10">
          {typedText}
          <motion.span 
            className="inline-block w-1 h-7 bg-blue-500 align-middle"
            animate={{ opacity: showCaret ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/portfolio_creation_page/1_name" passHref>
            <motion.button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-md text-lg md:text-xl cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ 
                backgroundColor: "#1d4ed8",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get started
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="relative hidden lg:block" style={{ 
        width: '1100px', 
        height: '1100px', 
        flexShrink: 0, 
        top: '-50px',
        position: 'fixed',
        right: '0px',
      }}>
        {/* Rotating Gear */}
        <motion.img 
          src="/gear.svg" 
          alt="Gear Logo"
          className="absolute w-full h-full opacity-40"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Static G Logo */}
        <motion.img 
          src="/G.svg" 
          alt="Gear G"
          className="absolute w-full h-full opacity-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
      </div>
    </motion.div>
  );
}

export default PortfolioCreationPage;