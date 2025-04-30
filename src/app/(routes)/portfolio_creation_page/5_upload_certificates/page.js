"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { FcLeft } from "react-icons/fc";
import { FaEye } from "react-icons/fa"; // Importing the eye icon

export default function CertificatesPage() {
  const [progress, setProgress] = useState(43);
  const [targetProgress, setTargetProgress] = useState(43);
  const [certificates, setCertificates] = useState([]);
  const [description, setDescription] = useState("");

  // States for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleRemoveCertificate = (indexToRemove) => {
    setCertificates((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    if (certificates.length > 0 && description.trim().length > 0) {
      setTargetProgress(55);
    } else if (certificates.length > 0) {
      setTargetProgress(49);
    } else {
      setTargetProgress(43);
    }
  }, [certificates, description]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress !== targetProgress) {
        setProgress((prev) => {
          const delta = targetProgress > prev ? 1 : -1;
          return prev + delta;
        });
      }
    }, 20);
    return () => clearTimeout(timer);
  }, [progress, targetProgress]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setCertificates((prev) => [...prev, ...files]);

    // Reset input value so the same file can be selected again
    e.target.value = null;
  };

  const canProceed = certificates.length > 0 && description.trim().length > 0;

  // Function to open the modal and set the selected image
  const openModal = (cert) => {
    setSelectedImage(cert);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
      {/* Background gear logo */}
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
                transform: "translate(-50%, -50%)",
                marginTop: "4px",
                marginLeft: "-4px",
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
        {/* Main glass container */}
        <div
          className="w-full h-[480px] rounded-lg relative overflow-visible shadow-lg"
          style={{
            background: "rgba(235, 245, 255, 0.5)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Certificates</h2>
            <div className="flex gap-4 items-center mb-4 flex-wrap">
              <label className="font-medium">Upload Certificate:</label>
              <label className="bg-blue-600 text-white px-4 py-1 rounded-2xl cursor-pointer -ml-2">
                Choose File
                <input type="file" onChange={handleFileUpload} multiple className="hidden" />
              </label>
              <label className="font-medium ml-2">Certificate Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-1 -ml-2 w-124 px-3 py-2  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              />
            </div>

            <div className="w-full h-[320px] bg-white border rounded overflow-x-auto overflow-y-hidden p-5">
              <div className="flex gap-4 w-max">
                {certificates.length === 0 ? (
                  <div className="flex w-62 items-center border border-dashed p-8 rounded shadow text-gray-400 text-center h-[260px]">
                    <span>No certificate uploaded yet. Upload to preview here.</span>
                  </div>
                ) : (
                  certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center border p-2 rounded shadow w-[220px] h-[260px] bg-white"
                    >
                      <button
                        onClick={() => handleRemoveCertificate(index)}
                        className="absolute -top-1.5 right-0 text-red-500 hover:text-red-700 text-xl font-bold z-10 cursor-pointer"
                        aria-label="Remove certificate"
                      >
                        &times;
                      </button>
                      <div className="w-full h-[150px] bg-white border rounded flex items-center justify-center overflow-hidden">
                        <Image
                          src={URL.createObjectURL(cert)}
                          alt={`Certificate ${index + 1}`}
                          width={150}
                          height={150}
                          className="object-contain max-w-full max-h-full"
                        />
                      </div>
                      <p className="mt-2 font-semibold text-center text-sm truncate w-full">{cert.name}</p>
                      <p className="text-xs text-gray-600">Uploaded File</p>

                      {/* View All Icon (eye icon) */}
                      <button
                        className="absolute bottom-2 right-2 text-xl text-blue-500 hover:text-blue-700"
                        onClick={() => openModal(cert)} // Open the modal and pass the selected image
                        aria-label="View all"
                      >
                        <FaEye />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute -bottom-14 left-0 flex gap-4">
            <Link
              href="/portfolio_creation_page/4_education"
              className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group"
            >
              <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300" />
            </Link>
          </div>
          <div className="absolute -bottom-12 right-0">
            <Link
              href="/portfolio_creation_page/6_work_experience"
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
      </div>

      {/* Modal to view the image */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-2xl text-red-500"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="w-[500px] h-[500px] flex items-center justify-center">
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Full certificate view"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
