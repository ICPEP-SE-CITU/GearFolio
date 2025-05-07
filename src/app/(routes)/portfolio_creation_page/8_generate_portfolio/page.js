"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcLeft } from "react-icons/fc";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from '../../../../styles/GeneratePortfolio.module.css';

export default function GeneratePortfolioPage() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isGenerating) {
      // Collect all portfolio data from localStorage
      const portfolioData = {
        // Personal Information
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        phone: localStorage.getItem('phone'),
        address: localStorage.getItem('address'),
        website: localStorage.getItem('website'),
        
        // Education
        education: JSON.parse(localStorage.getItem('education') || '[]'),
        
        // Work Experience
        workExperience: JSON.parse(localStorage.getItem('workExperience') || '[]'),
        
        // Certificates
        certificates: JSON.parse(localStorage.getItem('certificates') || '[]'),
        
        // Skills
        skills: JSON.parse(localStorage.getItem('skills') || '[]'),
        
        // Template
        template: localStorage.getItem('selectedTemplate')
      };

      // Store all data in a single object
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsGenerating(false);
              setShowSuccess(true);
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleViewPortfolio = () => {
    router.push('/portfolio_preview');
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div 
            key="loading"
            className="flex flex-col items-center justify-center space-y-8 z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1 
              className="text-5xl font-bold font-serif bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 h-15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Generating Profile
            </motion.h1>
            
            <motion.div 
              className="relative w-64 h-64 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <Image
                src="/gear.svg"
                width={140}
                height={140}
                alt="Loading gear"
                className={`absolute animate-spin ${progress === 100 ? 'animate-ping' : ''}`}
                style={{ animationDuration: '2s' }}
              />
              <Image
                src="/g.svg"
                width={120}
                height={120}
                alt="Center logo"
                className="absolute"
              />
            </motion.div>
            
            <motion.div 
              className="text-center space-y-2 w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-lg text-blue-600 font-medium">{progress}% completed</p>
            </motion.div>
          </motion.div>
        ) : showSuccess ? (
          <motion.div 
            key="success"
            className={`${styles.successState} flex flex-col items-center justify-center space-y-8 text-center z-10`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className={`${styles.checkmarkAnimation} relative w-64 h-64 flex items-center justify-center`}>
              <motion.div 
                className={styles.checkmarkContainer}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              >
                <svg 
                  className={styles.checkmark} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 52 52"
                >
                  <circle 
                    className={styles.checkmarkCircle} 
                    cx="26" 
                    cy="26" 
                    r="25" 
                    fill="none"
                  />
                  <path 
                    className={styles.checkmarkCheck} 
                    fill="none" 
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </motion.div>
            </div>
            
            <motion.div 
              className="space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl font-bold font-serif text-blue-700">Profile Generated</h1>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
              >
                <button
                  onClick={handleViewPortfolio}
                  className="relative inline-block px-8 py-3 text-white rounded-lg text-lg font-medium shadow-lg overflow-hidden group"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Static gradient fallback */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                  
                  {/* Text content */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Click to View Portfolio
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Navigation buttons */}
      {isGenerating && (
        <motion.div 
          className="absolute bottom-8 left-8 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/portfolio_creation_page/7_template_section"
            className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
          >
            <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300"/>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}