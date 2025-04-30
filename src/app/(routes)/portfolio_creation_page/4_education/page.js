"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { FcLeft } from "react-icons/fc";

export default function PortfolioCreationPage() {
  const [progress, setProgress] = useState(43);
  const [targetProgress, setTargetProgress] = useState(43);
  const [elementary, setElementary] = useState("");
  const [juniorHigh, setJuniorHigh] = useState("");
  const [seniorHigh, setSeniorHigh] = useState("");
  const [degreeLevel, setDegreeLevel] = useState({
    undergraduate: { checked: false, university: "" },
    masters: { checked: false, university: "" },
    doctoral: { checked: false, university: "" }
  });

  // Check if all required fields are filled
  useEffect(() => {
    const baseProgress = 43;
    const maxProgress = 55;
    const progressPerSection = 3;
    let addedProgress = 0;

    
    if (elementary.trim() !== "") {
      addedProgress += progressPerSection;
    }
    
    if (juniorHigh.trim() !== "") {
      addedProgress += progressPerSection;
    }
    
    if (seniorHigh.trim() !== "") {
      addedProgress += progressPerSection;
    }

    const isAnyDegreeLevelComplete =
      (degreeLevel.undergraduate.checked && degreeLevel.undergraduate.university.trim() !== "") ||
      (degreeLevel.masters.checked && degreeLevel.masters.university.trim() !== "") ||
      (degreeLevel.doctoral.checked && degreeLevel.doctoral.university.trim() !== "");

    if (isAnyDegreeLevelComplete) {
      addedProgress += progressPerSection;
    }

    const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);

    setTargetProgress(newTargetProgress);
  }, [elementary, juniorHigh, seniorHigh, degreeLevel]);

  // Progress animation
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

  // Determine if user can proceed
  const canProceed =
    elementary.trim() !== "" &&
    juniorHigh.trim() !== "" &&
    seniorHigh.trim() !== "" &&
    (degreeLevel.undergraduate.checked ||
      degreeLevel.masters.checked ||
      degreeLevel.doctoral.checked) &&
    (degreeLevel.undergraduate.checked ? degreeLevel.undergraduate.university.trim() !== "" : true) &&
    (degreeLevel.masters.checked ? degreeLevel.masters.university.trim() !== "" : true) &&
    (degreeLevel.doctoral.checked ? degreeLevel.doctoral.university.trim() !== "" : true);

  const handleDegreeChange = (degree) => {
    setDegreeLevel(prev => ({
      ...prev,
      [degree]: {
        ...prev[degree],
        checked: !prev[degree].checked,
        university: !prev[degree].checked ? "" : prev[degree].university
      }
    }));
  };

  const handleUniversityChange = (degree, value) => {
    setDegreeLevel(prev => ({
      ...prev,
      [degree]: {
        ...prev[degree],
        university: value
      }
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
          <div className="p-10 relative max-h-[70vh] overflow-y-auto">
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

              {/* Degree Checkboxes with University Inputs */}
              <div className="space-y-4">
                {/* Undergraduate */}
                <div className="w-full border border-gray-300 rounded-md bg-white p-3 space-y-2">
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
                    <div className="pl-9">
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
                    </div>
                  )}
                </div>

                {/* Masters */}
                <div className="w-full border border-gray-300 rounded-md bg-white p-3 space-y-2">
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
                    <div className="pl-9">
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
                    </div>
                  )}
                </div>

                {/* Doctoral */}
                <div className="w-full border border-gray-300 rounded-md bg-white p-3 space-y-2">
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
                    <div className="pl-9">
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
                    </div>
                  )}
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
            className={`py-2 px-8 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${canProceed
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-100 cursor-not-allowed"
              }`}
            onClick={(e) => {
              if (!canProceed) {
                e.preventDefault();
              }
            }}
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