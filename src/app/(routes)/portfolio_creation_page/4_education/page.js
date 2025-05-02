"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { FcLeft } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import useFormStore from "@/stores/useFormCreatePortfolio";

export default function PortfolioCreationPage() {
  // const [progress, setProgress] = useState(43);
  // const [targetProgress, setTargetProgress] = useState(43);
  // const [elementary, setElementary] = useState("");
  // const [juniorHigh, setJuniorHigh] = useState("");
  // const [seniorHigh, setSeniorHigh] = useState("");
  // const [degreeLevel, setDegreeLevel] = useState({
  //   undergraduate: { checked: false, university: "" },
  //   masters: { checked: false, university: "" },
  //   doctoral: { checked: false, university: "" }
  // });
  // const [isAnimating, setIsAnimating] = useState(false);

  // useEffect(() => {
  //   const baseProgress = 43;
  //   const maxProgress = 55;
  //   const progressPerSection = 3;
  //   let addedProgress = 0;

  //   if (elementary.trim() !== "") {
  //     addedProgress += progressPerSection;
  //   }
    
  //   if (juniorHigh.trim() !== "") {
  //     addedProgress += progressPerSection;
  //   }
    
  //   if (seniorHigh.trim() !== "") {
  //     addedProgress += progressPerSection;
  //   }

  //   const isAnyDegreeLevelComplete =
  //     (degreeLevel.undergraduate.checked && degreeLevel.undergraduate.university.trim() !== "") ||
  //     (degreeLevel.masters.checked && degreeLevel.masters.university.trim() !== "") ||
  //     (degreeLevel.doctoral.checked && degreeLevel.doctoral.university.trim() !== "");

  //   if (isAnyDegreeLevelComplete) {
  //     addedProgress += progressPerSection;
  //   }

  //   const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);
  //   setTargetProgress(newTargetProgress);
  // }, [elementary, juniorHigh, seniorHigh, degreeLevel]);

  // useEffect(() => {
  //   if (Math.abs(progress - targetProgress) < 0.1) {
  //     setProgress(targetProgress);
  //     return;
  //   }

  //   const animationFrame = requestAnimationFrame(() => {
  //     const diff = targetProgress - progress;
  //     const step = Math.abs(diff) < 0.5 ? diff : diff * 0.1;
  //     setProgress(prev => Math.round((prev + step) * 10) / 10);
  //   });

  //   return () => cancelAnimationFrame(animationFrame);
  // }, [progress, targetProgress]);

  // const canProceed =
  //   elementary.trim() !== "" &&
  //   juniorHigh.trim() !== "" &&
  //   seniorHigh.trim() !== "" &&
  //   (degreeLevel.undergraduate.checked ||
  //     degreeLevel.masters.checked ||
  //     degreeLevel.doctoral.checked) &&
  //   (degreeLevel.undergraduate.checked ? degreeLevel.undergraduate.university.trim() !== "" : true) &&
  //   (degreeLevel.masters.checked ? degreeLevel.masters.university.trim() !== "" : true) &&
  //   (degreeLevel.doctoral.checked ? degreeLevel.doctoral.university.trim() !== "" : true);

  // const handleDegreeChange = (degree) => {
  //   setDegreeLevel(prev => ({
  //     ...prev,
  //     [degree]: {
  //       ...prev[degree],
  //       checked: !prev[degree].checked,
  //       university: !prev[degree].checked ? "" : prev[degree].university
  //     }
  //   }));
  // };

  // const handleUniversityChange = (degree, value) => {
  //   setDegreeLevel(prev => ({
  //     ...prev,
  //     [degree]: {
  //       ...prev[degree],
  //       university: value
  //     }
  //   }));
  // };

  // const handleNext = (e) => {
  //   if (!canProceed) {
  //     e.preventDefault();
  //     return;
  //   }
  //   setIsAnimating(true);
  // };
  const handleDegreeChange = (degree) => {
    updateDegreeLevel(degree, "checked", !degreeLevel[degree].checked);
    // Reset university field if unchecked
    if (!degreeLevel[degree].checked) {
      updateDegreeLevel(degree, "university", "");
    }
  };

  const handleUniversityChange = (degree, value) => {
    updateDegreeLevel(degree, "university", value);
  };
// Use Zustand store for form state
const {
  elementary,
  juniorHigh,
  seniorHigh,
  degreeLevel,
  setElementary,
  setJuniorHigh,
  setSeniorHigh,
  updateDegreeLevel,
} = useFormStore();

const [progress, setProgress] = useState(43); // Local state for progress animation
const [targetProgress, setTargetProgress] = useState(43); // Local state for progress target
const [isAnimating, setIsAnimating] = useState(false); // Local state for animation control

useEffect(() => {
  const baseProgress = 43;
  const maxProgress = 57;
  const progressPerField = 3.5;
  let addedProgress = 0;

  if (elementary.trim() !== "") {
    addedProgress += progressPerField;
  }
  if (juniorHigh.trim() !== "") {
    addedProgress += progressPerField;
  }
  if (seniorHigh.trim() !== "") {
    addedProgress += progressPerField;
  }
  if (
    Object.values(degreeLevel).some(
      (level) => level.checked && level.university.trim() !== ""
    )
  ) {
    addedProgress += progressPerField;
  }

  const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);
  setTargetProgress(newTargetProgress);
}, [elementary, juniorHigh, seniorHigh, degreeLevel]);

useEffect(() => {
  if (Math.abs(progress - targetProgress) < 0.1) {
    setProgress(targetProgress);
    return;
  }

  const animationFrame = requestAnimationFrame(() => {
    const diff = targetProgress - progress;
    const step = Math.abs(diff) < 0.5 ? diff : diff * 0.1;
    setProgress((prev) => Math.round((prev + step) * 10) / 10);
  });

  return () => cancelAnimationFrame(animationFrame);
}, [progress, targetProgress]);

const canProceed =
  elementary.trim() !== "" &&
  juniorHigh.trim() !== "" &&
  seniorHigh.trim() !== "" &&
  Object.values(degreeLevel).some(
    (level) => level.checked && level.university.trim() !== ""
  );

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
              key="education-info"
              className="p-10 h-full relative overflow-y-auto"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Education</h2>

              <div className="space-y-6">
                {/* Elementary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Elementary:
                  </label>
                  <input
                    type="text"
                    value={elementary}
                    onChange={(e) => setElementary(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                {/* Junior High */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Junior High School:
                  </label>
                  <input
                    type="text"
                    value={juniorHigh}
                    onChange={(e) => setJuniorHigh(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                {/* Senior High */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senior High School:
                  </label>
                  <input
                    type="text"
                    value={seniorHigh}
                    onChange={(e) => setSeniorHigh(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                {/* College Header */}
                <motion.h2 
                  className="text-2xl font-semibold text-gray-800 mt-8 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  College
                </motion.h2>

                {/* Degree Checkboxes with University Inputs */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Undergraduate */}
                  <motion.div 
                    className="w-full border border-gray-300 rounded-md bg-white p-3 space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={degreeLevel.undergraduate.checked}
                        onChange={() => handleDegreeChange('undergraduate')}
                        className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">Undergraduate</span>
                    </label>
                    {degreeLevel.undergraduate.checked && (
                      <motion.div 
                        className="pl-9"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          University:
                        </label>
                        <input
                          type="text"
                          value={degreeLevel.undergraduate.university}
                          onChange={(e) => handleUniversityChange('undergraduate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                          required
                        />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Masters */}
                  <motion.div 
                    className="w-full border border-gray-300 rounded-md bg-white p-3 space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={degreeLevel.masters.checked}
                        onChange={() => handleDegreeChange('masters')}
                        className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">Master's Program</span>
                    </label>
                    {degreeLevel.masters.checked && (
                      <motion.div 
                        className="pl-9"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          University:
                        </label>
                        <input
                          type="text"
                          value={degreeLevel.masters.university}
                          onChange={(e) => handleUniversityChange('masters', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                          required
                        />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Doctoral */}
                  <motion.div 
                    className="w-full border border-gray-300 rounded-md bg-white p-3 space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={degreeLevel.doctoral.checked}
                        onChange={() => handleDegreeChange('doctoral')}
                        className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">Doctoral</span>
                    </label>
                    {degreeLevel.doctoral.checked && (
                      <motion.div 
                        className="pl-9"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          University:
                        </label>
                        <input
                          type="text"
                          value={degreeLevel.doctoral.university}
                          onChange={(e) => handleUniversityChange('doctoral', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                          required
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="absolute -bottom-14 left-0 flex gap-4">
          <Link
            href="/portfolio_creation_page/3_address"
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
            href="/portfolio_creation_page/5_upload_certificates"
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