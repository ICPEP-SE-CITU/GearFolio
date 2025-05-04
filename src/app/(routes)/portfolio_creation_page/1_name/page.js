"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { IoIosPerson } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import useFormStore from "@/stores/useFormCreatePortfolio";

export default function NameInputPage() {
  // Use Zustand store for form state
  const {
    firstName,
    middleName,
    surname,
    suffix,
    userImage,
    setFirstName,
    setMiddleName,
    setSurname,
    setSuffix,
    setUserImage,
  } = useFormStore();

  const [progress, setProgress] = useState(0); // Keep local state for progress animation
  const [targetProgress, setTargetProgress] = useState(0); // Keep local state for progress target
  const [isUploading, setIsUploading] = useState(false); // Keep local state for upload status
  const fileInputRef = useRef(null);
  const router = useRouter();

  const MAX_PAGE_PROGRESS = 17;


  // const handleFileChange = (event) => {
  //   setIsUploading(true);
  //   const file = event.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     console.log("Selected file:", file); // Debug log
  //     setTimeout(() => {
  //       const imageUrl = URL.createObjectURL(file);
  //       console.log("Generated image URL:", imageUrl); // Debug log
  //       setUserImage(imageUrl, file); // Update both userImage and userImageFile
  //       setIsUploading(false);
  //       console.log("Store updated with userImage and userImageFile"); 
  //     }, 800); y
  //   } else {
  //     console.warn("No file selected or file is not an image"); 
  //     setIsUploading(false);
  //   }
  // };
  const handleFileChange = (event) => {
    setIsUploading(true);
    const file = event.target.files[0];
    console.log("Selected file:", file); // Debug log
    try {
      if (file && file.type.startsWith("image/")) {
        setTimeout(() => {
          const imageUrl = URL.createObjectURL(file);
          console.log("Generated image URL:", imageUrl); // Debug log
          setUserImage(imageUrl, file); // Update both userImage and userImageFile
          console.log("Store updated with userImage and userImageFile"); // Debug log
          setIsUploading(false);
        }, 800); // Simulate upload delay
      } else {
        console.warn("No file selected or file is not an image"); // Debug log
        setIsUploading(false);
        alert("Please select a valid image file.");
      }
    } catch (error) {
      console.error("Error in handleFileChange:", error); // Debug log
      setIsUploading(false);
      alert("An error occurred while processing the image. Please try again.");
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const requiredFields = [firstName, surname];
    const totalRequiredFields = requiredFields.length + (middleName ? 1 : 0);
    const completedFields = requiredFields.filter(field => field.trim() !== "").length + 
                          (middleName.trim() !== "" ? 1 : 0);
    const formCompletion = (completedFields / totalRequiredFields) * 0.9;
    const imageBonus = userImage ? 0.1 : 0;
    const pageCompletion = Math.min(1, formCompletion + imageBonus);
    const overallProgress = pageCompletion * MAX_PAGE_PROGRESS;
    setTargetProgress(overallProgress);
  }, [firstName, middleName, surname, userImage]);

  useEffect(() => {
    if (Math.abs(progress - targetProgress) < 0.1) {
      setProgress(targetProgress);
      return;
    }
    
    const animationFrame = requestAnimationFrame(() => {
      const diff = targetProgress - progress;
      const step = Math.abs(diff) < 0.5 ? diff : diff * 0.1;
      setProgress(prevProgress => Math.round((prevProgress + step) * 10) / 10);
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [progress, targetProgress]);

  const canProceed = firstName.trim() !== "" && surname.trim() !== "" && userImage !== null;

  const handleNext = (e) => {
    if (!canProceed) {
      e.preventDefault();
      return;
    }
    // No need to prevent default, Link will handle it
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative overflow-hidden"
    >
      {/* Background logo */}
      <motion.div 
        className="fixed inset-0 z-0 opacity-45 flex items-center justify-center pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.45 }}
        transition={{ duration: 0.8 }}
      >
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
      </motion.div>

      {/* Header */}
      <motion.div 
        className="w-full max-w-5xl mx-auto mb-6 text-center relative z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
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
      </motion.div>

      {/* Main form container */}
      <motion.div 
        className="w-full max-w-5xl mx-auto relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div 
          className="w-full h-[553px] rounded-lg relative overflow-hidden shadow-lg"
          style={{ 
            background: 'rgba(235, 245, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <div className="p-10 h-full relative">
            <motion.h2 
              className="text-2xl font-semibold text-gray-800 mb-8"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Name
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Profile Image Upload */}
              <div className="col-span-1">
                <motion.div 
                  className="w-full aspect-square border border-blue-100 rounded-lg mb-2 overflow-hidden flex items-center justify-center bg-white bg-opacity-60 cursor-pointer"
                  style={{
                    boxShadow: '0 4px 16px rgba(0, 65, 255, 0.05)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUploadClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <AnimatePresence mode="wait">
                    {isUploading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <motion.div
                          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    ) : userImage ? (
                      <motion.div
                        key="image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                      >
                        <Image 
                          src={userImage} 
                          width={150} 
                          height={150} 
                          alt="User profile" 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <IoIosPerson className="w-1/2 h-1/2 fill-blue-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <motion.button 
                  className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                  onClick={handleUploadClick}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload
                </motion.button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              
              {/* Form Fields */}
              <div className="col-span-3 space-y-4">
                {['firstName', 'middleName', 'surname', 'suffix'].map((field, i) => (
                  <motion.div
                    key={field}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={field}>
                      {field === 'firstName' ? 'First Name:' : 
                       field === 'middleName' ? 'Middle Name:' : 
                       field === 'surname' ? 'Surname:' : 'Suffix:'}
                    </label>
                    <motion.input
                      id={field}
                      type="text"
                      value={field === 'firstName' ? firstName : 
                            field === 'middleName' ? middleName : 
                            field === 'surname' ? surname : suffix}
                      onChange={(e) => {
                        if (field === 'firstName') setFirstName(e.target.value);
                        else if (field === 'middleName') setMiddleName(e.target.value);
                        else if (field === 'surname') setSurname(e.target.value);
                        else setSuffix(e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      required={field !== 'suffix'}
                      placeholder={field === 'suffix' ? 'Optional' : ''}
                      whileFocus={{ 
                        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                        scale: 1.01
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next button */}
        <motion.div 
          className="absolute -bottom-12 right-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/portfolio_creation_page/2_personal_information"
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
        </motion.div>
      </motion.div>

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
    </motion.div>
  );
}