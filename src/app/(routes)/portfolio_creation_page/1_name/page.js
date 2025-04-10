"use client"; // This component is a client component in Next.js

import { useState, useRef, useEffect } from "react"; // Import React hooks for state and lifecycle management
import Link from "next/link"; // Import Link from Next.js for navigation
import Image from "next/image"; // Import Image from Next.js for optimized image handling
import { Progress } from "@/components/ui/progress"; // Import custom Progress component
import { IoIosPerson } from "react-icons/io"; // Import icon for user profile

export default function NameInputPage() {
  const [userImage, setUserImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [suffix, setSuffix] = useState("");
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const fileInputRef = useRef(null);
  
  // Constants for progress calculation
  const MAX_PAGE_PROGRESS = 15; // This page represents 15% of total progress
  
  // Handle file upload and set user image
  // This function is triggered when the user selects a file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };
  
  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  //For Backend this just a UI Logic for the progress bar
  // Calculate target progress whenever form fields change
  useEffect(() => {
    // Define required fields (userImage is optional)
    const requiredFields = [firstName, surname];
    const totalRequiredFields = requiredFields.length + (middleName ? 1 : 0);
    
    // Count completed required fields
    const completedFields = requiredFields.filter(field => field.trim() !== "").length + 
                          (middleName.trim() !== "" ? 1 : 0);
    
    // Calculate percentage within this page (max 90% from form fields)
    const formCompletion = (completedFields / totalRequiredFields) * 0.9;
    
    // Add bonus for image (max 10% contribution)
    const imageBonus = userImage ? 0.1 : 0;
    
    // Total completion for this page (0 to 1 scale)
    const pageCompletion = Math.min(1, formCompletion + imageBonus);
    
    // Convert to overall progress percentage (max 15% of total)
    const overallProgress = pageCompletion * MAX_PAGE_PROGRESS;
    
    // Set the target progress
    setTargetProgress(overallProgress);
  }, [firstName, middleName, surname, userImage]);

  // Animate progress towards target
  useEffect(() => {
    if (Math.abs(progress - targetProgress) < 0.1) {
      setProgress(targetProgress);
      return;
    }
    
    const animationFrame = requestAnimationFrame(() => {
      // Smooth animation by moving a percentage of the remaining distance
      const diff = targetProgress - progress;
      const step = Math.abs(diff) < 0.5 ? diff : diff * 0.1;
      
      setProgress(prevProgress => {
        const newProgress = prevProgress + step;
        // Round to one decimal place for smoother animation
        return Math.round(newProgress * 10) / 10;
      });
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [progress, targetProgress]);

  // Calculate required fields for next button enablement
  const canProceed = firstName.trim() !== "" && middleName.trim() !== "" && surname.trim() !== "";


  //Render the UI for the page
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
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
              <Progress value={progress} className="h-2 transition-all duration-300 ease-out" />
            </div>
            
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

      {/* Modern glass effect container with subtle blue tint */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Main glass container */}
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
            {/* Name Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Name</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Profile Image Upload */}
              <div className="col-span-1">
                <div 
                  className="w-full aspect-square border border-blue-100 rounded-lg mb-2 overflow-hidden flex items-center justify-center bg-white bg-opacity-60"
                  style={{
                    boxShadow: '0 4px 16px rgba(0, 65, 255, 0.05)'
                  }}
                >
                  {userImage ? (
                    <Image 
                      src={userImage} 
                      width={150} 
                      height={150} 
                      alt="User profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <IoIosPerson className="w-1/2 h-1/2 fill-blue-600" /> {/* Adjust size as needed */}
                    </div>
                  )}
                </div>
                <button 
                  className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                  onClick={handleUploadClick}
                >
                  Upload
                </button>
                {/* Hidden file input */}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                    First Name:
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="middleName">
                    Middle Name:
                  </label>
                  <input
                    id="middleName"
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="surname">
                    Surname:
                  </label>
                  <input
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="suffix">
                    Suffix:
                  </label>
                  <input
                    id="suffix"
                    type="text"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next button outside the container in the lower right */}
        <div className="absolute -bottom-12 right-0">
          <Link
            href="/portfolio_creation_page/2_personal_information"
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