"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcLeft } from "react-icons/fc";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import useFormStore from "@/stores/useFormCreatePortfolio";
import { savePortfolioToAppwrite } from "@/stores/savePortfolioToAppwrite";

export default function TemplatePage() {
  
  const router = useRouter();
  const {
    firstName,
    middleName,
    surname,
    suffix,
    userImage,
    userImageFile, // Add this
    email,
    contactNumber,
    socials,
    country,
    province,
    city,
    postal,
    elementary,
    juniorHigh,
    seniorHigh,
    degreeLevel,
    certificates,
    jobs,
    skills,
    projects,
    selectedTemplate,
    toggleTemplate,
  } = useFormStore();
  const [progress, setProgress] = useState(83);
  const [targetProgress, setTargetProgress] = useState(83);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Add state for error message
  const handleTemplateSelect = (templateId) => {
    toggleTemplate(templateId);
  };

  const handleNextClick = async (e) => {
    if (!canProceed) {
      e.preventDefault();
      return;
    }
    setIsNavigating(true);
    e.preventDefault();
       // Prepare the form data
    const formData = {
      firstName,
      middleName,
      surname,
      suffix,
      userImage,
      userImageFile, // Add this
      email,
      contactNumber,
      socials,
      country,
      province,
      city,
      postal,
      elementary,
      juniorHigh,
      seniorHigh,
      degreeLevel,
      certificates,
      jobs,
      skills,
      projects,
      selectedTemplate,
    };
    // Log the formData for debugging
    console.log("Form data being sent to savePortfolioToAppwrite:", formData);
    console.log("Certificates details:", certificates);
    console.log("Projects details:", projects);

    // Save to Appwrite
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await savePortfolioToAppwrite(formData);
      console.log("Data saved successfully to Appwrite");
      router.push("/portfolio_creation_page/8_generate_portfolio");
    } catch (error) {
      console.error("Error in handleNextClick:", error);
      setErrorMessage(error.message);
      setIsNavigating(false);
    } finally {
      setIsSaving(false);
    }
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
      {/* Background logo */}
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4 [text-shadow:_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white,_1px_1px_0_white]">
          Create your Portfolio
        </h1>
        <div className="max-w-3xl mx-auto relative">
          <div className="relative">
            <div className="bg-blue-100 rounded-full overflow-hidden h-2">
              <Progress value={progress} className="h-2 transition-all duration-300 ease-out"/>
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
      </div>

      {/* Main glass container with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div 
          key="glass-container"
          className="w-full max-w-5xl mx-auto relative z-10"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="w-full h-[553px] rounded-lg relative overflow-hidden shadow-lg"
            style={{
              background: 'rgba(235, 245, 255, 0.5)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
          >
            <div className="p-10 h-full relative">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">Template Selection</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((template) => (
                  <motion.div
                    key={template}
                    onClick={() => handleTemplateSelect(template)}
                    className={`border rounded-lg h-90 flex items-center justify-center text-lg font-medium cursor-pointer transition
                      ${selectedTemplate === template
                        ? "bg-blue-200 border-blue-400 text-blue-800 shadow-lg"
                        : "text-gray-700 hover:shadow-lg"
                      }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.1 * template }
                    }}
                  >
                    Template {template}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="w-full max-w-5xl mx-auto flex justify-between mt-6">
        <Link
          href="/portfolio_creation_page/6_work_experience"
          className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
        >
          <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300" />
        </Link>

        <motion.button
          onClick={handleNextClick}
          className={`py-4 px-8 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${canProceed
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-400 text-gray-100 cursor-not-allowed"
            }`}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
          disabled={!canProceed}
        >
          {isNavigating ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.span>
          ) : (
            "Finish"
          )}
        </motion.button>
      </div>

      {/* AI Mascot */}
      <div className="absolute top-4 right-4 z-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="text-2xl">🤖</div>
        </div>
      </div>
    </div>
  );
}