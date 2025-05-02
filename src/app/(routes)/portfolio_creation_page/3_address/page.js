"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { FcLeft } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import useFormStore from "@/stores/useFormCreatePortfolio";

export default function PortfolioCreationPage() {
  // Use Zustand store for form state
  const { country, province, city, postal, setCountry, setProvince, setCity, setPostal } =
    useFormStore();

  const [progress, setProgress] = useState(31); // Local state for progress animation
  const [targetProgress, setTargetProgress] = useState(31); // Local state for progress target
  const [isAnimating, setIsAnimating] = useState(false); // Local state for animation control

  useEffect(() => {
    const baseProgress = 31;
    const maxProgress = 43;
    const progressPerField = 3;
    let addedProgress = 0;

    if (country.trim() !== "") {
      addedProgress += progressPerField;
    }
    if (province.trim() !== "") {
      addedProgress += progressPerField;
    }
    if (city.trim() !== "") {
      addedProgress += progressPerField;
    }
    if (postal.trim() !== "") {
      addedProgress += progressPerField;
    }

    const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);
    setTargetProgress(newTargetProgress);
  }, [country, province, city, postal]);

  useEffect(() => {
    if (Math.abs(progress - targetProgress) < 0.1) {
      setProgress(targetProgress);
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      const diff = targetProgress - progress;
      const step = Math.abs(diff) < 0.5 ? diff : diff * 0.1;
      setProgress(prev => Math.round((prev + step) * 10) / 10);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [progress, targetProgress]);

  const canProceed = country.trim() !== "" && 
                    province.trim() !== "" && 
                    city.trim() !== "" && 
                    postal.trim() !== "";

  const handlePostalCodeChange = (event) => {
    const rawValue = event.target.value;
    const numericValue = rawValue.replace(/\D/g, '');
    setPostal(numericValue);
  };

  const handleNext = (e) => {
    if (!canProceed) {
      e.preventDefault();
      return;
    }
    setIsAnimating(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
      {/* Background logo (static) */}
      <div className="fixed inset-0 z-0 opacity-45 flex items-center justify-center pointer-events-none">
        <div className="w-[937px] h-[937px] flex-shrink-0 aspect-square">
          <Image
            src="/gear_folio_logo.svg"
            width={937}
            height={937}
            alt="Background logo"
            priority
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Header with title and progress (static) */}
      <div className="w-full max-w-5xl mx-auto mb-6 text-center relative z-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 [text-shadow:_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white,_1px_1px_0_white]">
          Create your Portfolio
        </h1>
        <div className="max-w-3xl mx-auto relative">
          <div className="relative">
            <div className="bg-blue-100 rounded-full overflow-hidden h-2">
              <Progress value={progress} className="h-2 transition-all duration-300 ease-out" />
            </div>
            <div
              className="absolute top-0 z-20 transition-all duration-300 ease-out"
              style={{
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                marginTop: "4px",
                marginLeft: "-4px"
              }}
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Image src="/gear.svg" width={20} height={20} alt="Progress indicator" />
              </motion.div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <span className="text-lg text-blue-600 font-bold">{Math.round(progress)}% completed</span>
          </div>
        </div>
      </div>

      {/* Glass container with animated content */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div
          className="w-full h-[553px] rounded-lg relative overflow-hidden shadow-lg"
          style={{
            background: 'rgba(235, 245, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="address-info"
              className="p-10 h-full relative"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">Address</h2>

              <div className="grid grid-cols-1 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country:
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province:
                  </label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City/Municipality:
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code:
                  </label>
                  <input
                    type="text"
                    placeholder="60XX"
                    inputMode="numeric"
                    value={postal}
                    onChange={handlePostalCodeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                    maxLength={4}
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="absolute -bottom-14 left-0 flex gap-4">
          <Link
            href="/portfolio_creation_page/2_personal_information"
            className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FcLeft className="text-4xl" />
            </motion.div>
          </Link>
        </div>
        <div className="absolute -bottom-14 right-0 flex gap-4">
          <Link
            href="/portfolio_creation_page/4_education"
            passHref
          >
            <motion.button
              className={`py-2 px-8 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                canProceed
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-100 cursor-not-allowed"
              }`}
              onClick={handleNext}
              whileHover={canProceed ? { y: -2, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" } : {}}
              whileTap={canProceed ? { scale: 0.95 } : {}}
              disabled={!canProceed}
            >
              Next
            </motion.button>
          </Link>
        </div>
      </div>

      {/* AI Mascot */}
      <motion.div 
        className="absolute top-4 right-4 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ rotate: [0, 10, -10, 0] }}
      >
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="text-2xl">🤖</div>
        </div>
      </motion.div>
    </div>
  );
}