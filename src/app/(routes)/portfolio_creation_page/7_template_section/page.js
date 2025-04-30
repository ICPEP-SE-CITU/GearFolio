"use client";

import { useState, useRef, useEffect } from "react"; // Import React hooks for state and lifecycle management
import Link from "next/link";
import { FcLeft } from "react-icons/fc";
import Image from "next/image"; // Import Image from Next.js for optimized image handling
import { Progress } from "@/components/ui/progress"; // Import custom Progress component

export default function TemplatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [progress, setProgress] = useState(83);
  const [targetProgress, setTargetProgress] = useState(83);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(prevSelected => {
      if (prevSelected === templateId) {
        return null;
      }
      return templateId;
    });
  };

  useEffect(() => {
    if (selectedTemplate !== null) {
      setTargetProgress(100);
    } else {
      setTargetProgress(83);
    }
  }, [selectedTemplate]);

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

  const canProceed = selectedTemplate != null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 flex flex-col items-center justify-center">

      {/* Background logo - now positioned as page background */}
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
      {/* Header with title and progress */}
      <div className="w-full max-w-5xl mx-auto mb-6 text-center relative z-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 [text-shadow:_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white,_1px_1px_0_white]"> {/* Text shadow for better visibility */}
          Create your Portfolio
        </h1>
        <div className="max-w-3xl mx-auto relative">
          {/* Progress bar container */}
          <div className="relative">
            {/* Progress bar */}
            <div className="bg-blue-100 rounded-full overflow-hidden h-2">
              {/* progress bar */}
              <Progress value={progress} className="h-2 transition-all duration-300 ease-out"/>
              {/* Gear positioned on top of progress bar */}
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
      </div>

      {/* Modern glass effect container with subtle blue tint */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Main glass container */}
        <div className="w-full h-[553px] rounded-lg relative overflow-hidden shadow-lg"
          style={{
            background: 'rgba(235, 245, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <div className="p-10 h-full relative">
            {/* Template Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Template Selection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((template) => (
                <div
                  key={template}
                  onClick={() => handleTemplateSelect(template)}
                  className={`border rounded-lg h-90 flex items-center justify-center text-lg font-medium cursor-pointer transition
                    ${selectedTemplate === template
                      ? "bg-blue-200 border-blue-400 text-blue-800 shadow-lg"
                      : "text-gray-700 hover:shadow-lg"
                    }`}
                >
                  Template {template}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      < div className="w-full max-w-5xl mx-auto flex justify-between mt-6" >
        <Link
          href="/portfolio_creation_page/6_work_experience"
          className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
        >
          <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300" />
        </Link>

        <Link
          href="/portfolio_creation_page/8_generate_portfolio"
          className={`py-4 px-8 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${canProceed
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-400 text-gray-100 cursor-not-allowed"
            }`}
          onClick={(e) => !canProceed && e.preventDefault()}
        >
          Next
        </Link>
      </div >




      {/* UI for AI Mascot Here. Note:This just an code representation */}
      {/* Frontend, just copy this code every page. akoa pani himoan og UI component */}
      <div className="absolute top-4 right-4 z-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="text-2xl">🤖</div>
        </div>
      </div>
    </div>
  );
}