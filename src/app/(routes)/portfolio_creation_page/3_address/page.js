"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { FcLeft } from "react-icons/fc";

export default function PortfolioCreationPage() {
  const [progress, setProgress] = useState(31);
  const [targetProgress, setTargetProgress] = useState(31);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  //const MAX_PAGE_PROGRESS = 6; // Assuming each page contributes equally to the progress

  useEffect(() => {
    const baseProgress = 31; // Progress starts at 31% for this page
    const maxProgress = 43;  // Progress ends at 43% for this page
    const progressPerField = 3; // Each filled field adds 3% (12% total / 4 fields)
    let addedProgress = 0;

    // Check each field and add progress if filled
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

    // Calculate the final target progress, ensuring it doesn't exceed the max for this page
    const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);

    setTargetProgress(newTargetProgress);
  }, [country, province, city, postal]);


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

  const canProceed = country.trim() !== "" && province.trim() !== "" && city.trim() !== "" && postal.trim() !== "";

  const handlePostalCodeChange = (event) => {
    const rawValue = event.target.value;
    // Remove any non-digit characters
    const numericValue = rawValue.replace(/\D/g, '');
    // Update the state only with the numeric value
    setPostal(numericValue);
    // Optional: Add a length limit if needed, e.g. numericValue.slice(0, 4) for PH postal codes
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


      {/* Form Section */}
      {/* Modern glass effect container with subtle blue tint */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Main glass container */}
        <div
          className="w-full h-[480px] rounded-lg relative overflow-hidden shadow-lg"
          style={{
            background: 'rgba(235, 245, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <div className="p-10 h-full relative">
            {/* Name Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              {/* Form Fields */}
              <div className="col-span-3 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                    Country:
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full md:w-[920px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="middleName">
                    Province:
                  </label>
                  <input
                    id="province"
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full md:w-[920px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="surname">
                    City/Municipality:
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full md:w-[920px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="postal">
                    Postal Code:
                  </label>
                  <input
                    id="postal"
                    type="text"
                    placeholder="60XX"
                    inputMode="numeric"
                    value={postal}
                    onChange={handlePostalCodeChange}
                    className="w-full md:w-[920px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next button outside the container in the lower right */}
        <div className="absolute -bottom-14 left-0 flex gap-4">
          <Link
            href="/portfolio_creation_page/2_personal_information"
            className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
          >
            <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300" />
          </Link>
        </div>
        <div className="absolute -bottom-12 right-0">
          <Link
            href="/portfolio_creation_page/4_education"
            className={`py-2 px-8 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${canProceed
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