"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FcLeft } from "react-icons/fc";
import Image from "next/image";
import styles from '../../../../styles/GeneratePortfolio.module.css';

export default function GeneratePortfolioPage() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsGenerating(false), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Loading/Generation State */}
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center space-y-8 z-10">
          <h1 className="text-5xl font-bold font-serif bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 h-15">
            Generating Profile
          </h1>
          
          <div className="relative w-64 h-64 flex items-center justify-center">
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
          </div>
          
          <div className="text-center space-y-2 w-full max-w-md">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-lg text-blue-600 font-medium">{progress}% completed</p>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className={`${styles.successState} flex flex-col items-center justify-center space-y-8 text-center z-10`}>
          {/* Checkmark animation */}
          <div className={`${styles.checkmarkAnimation} relative w-64 h-64 flex items-center justify-center`}>
            <div className={styles.checkmarkContainer}>
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
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">Profile Generated</h1>
            <Link
              href="/profile"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-300 text-lg font-medium shadow-lg"
            >
              Click to View Portfolio
            </Link>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      {isGenerating && (
        <div className="absolute bottom-8 left-8 z-10">
          <Link
            href="/portfolio_creation_page/7_template_section"
            className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
          >
            <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300"/>
          </Link>
        </div>
      )}
    </div>
  );
}