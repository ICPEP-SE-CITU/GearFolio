"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress"; 
import Image from "next/image";
import { FcLeft } from "react-icons/fc";

export default function PortfolioCreationPage() {
  const [progress, setProgress] = useState(25);
  const [targetProgress, setTargetProgress] = useState(25);
  const [elementary, setElementary] = useState("");
  const [juniorHigh, setJuniorHigh] = useState("");
  const [seniorHigh, setSeniorHigh] = useState("");
  const [college, setCollege] = useState("");
  const [degreeLevel, setDegreeLevel] = useState({
    undergraduate: false,
    masters: false,
    doctoral: false
  });
  const MAX_PAGE_PROGRESS = 6;
  
  useEffect(() => {
    const allFieldsFilled =
      elementary.trim() !== "" &&
      juniorHigh.trim() !== "" &&
      seniorHigh.trim() !== "" &&
      college.trim() !== "";
  
    const newProgress = allFieldsFilled ? 31 : 25;
    setTargetProgress(newProgress);
  }, [elementary, juniorHigh, seniorHigh, college]);

  useEffect(() => {
    if (Math.abs(progress - targetProgress) < 0.1) {
      setProgress(targetProgress);
      return;
    }
    
    const animationFrame = requestAnimationFrame(() => {
      const diff = targetProgress - progress;
      const step = Math.abs(diff) < 0.5 ? diff : diff * 0.1;
      
      setProgress(prevProgress => {
        const newProgress = prevProgress + step;
        return Math.round(newProgress * 10) / 10;
      });
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [progress, targetProgress]);

  const canProceed = elementary.trim() !== "" && 
                    juniorHigh.trim() !== "" && 
                    seniorHigh.trim() !== "" && 
                    college.trim() !== "";

  const handleDegreeChange = (degree) => {
    setDegreeLevel(prev => ({
      ...prev,
      [degree]: !prev[degree]
    }));
  };

  return (  
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
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
      
      {/* Page Header */}
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
                <div className="animate-spin">
                  <Image src="/gear.svg" width={20} height={20} alt="Progress indicator" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <span className="text-lg text-blue-600 font-bold">{Math.round(progress)}% completed</span>
            </div>
          </div>
      </div>
      
      {/* Form Section */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div 
          className="w-full rounded-lg relative overflow-hidden shadow-lg"
          style={{ 
            background: 'rgba(235, 245, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <div className="p-10 relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Education</h2>
            
            <div className="space-y-6">
              {/* Elementary */}
              <div>
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
              </div>

              {/* Junior High */}
              <div>
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
              </div>

              {/* Senior High */}
              <div>
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
              </div>

              {/* College Header */}
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">College</h2>

              {/* Degree Checkboxes - Updated with larger checkboxes and background */}
              <div className="mt-4 space-y-3">
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={degreeLevel.undergraduate}
                      onChange={() => handleDegreeChange('undergraduate')}
                      className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Undergraduate</span>
                  </label>
                </div>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={degreeLevel.masters}
                      onChange={() => handleDegreeChange('masters')}
                      className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Master's Program</span>
                  </label>
                </div>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={degreeLevel.doctoral}
                      onChange={() => handleDegreeChange('doctoral')}
                      className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Doctoral</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="absolute -bottom-14 left-0 flex gap-4">
          <Link
            href="/portfolio_creation_page/3_address"
            className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
          >
            <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300" />
          </Link>
        </div>
        <div className="absolute -bottom-12 right-0">
          <Link
            href="/portfolio_creation_page/5_upload_certificates"
            className={`py-2 px-8 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
              canProceed
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-gray-400 text-gray-100 cursor-not-allowed"
            }`}
            onClick={(e) => !canProceed && e.preventDefault()}
          >
            Next
          </Link>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="text-2xl">🤖</div>
        </div>
      </div>   
    </div>
  );
}