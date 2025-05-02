"use client";

import React, { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { FcLeft } from "react-icons/fc";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useFormStore from "@/stores/useFormCreatePortfolio";

export default function CertificatesPage() {
  // const [progress, setProgress] = useState(55);
  // const [targetProgress, setTargetProgress] = useState(55);
  // const [certificates, setCertificates] = useState([]);
  // const [description, setDescription] = useState("");
  // const [stagedFiles, setStagedFiles] = useState([]);
  // const fileInputRef = useRef(null);
  // const [isAnimating, setIsAnimating] = useState(false);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   const baseProgress = 55;
  //   const maxProgress = 69;
  //   let addedProgress = 0;

  //   if (certificates.length > 0) {
  //     addedProgress += 7;
  //     if (certificates.some(cert => cert.description.trim() !== "")) {
  //       addedProgress += 7;
  //     }
  //   }

  //   const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);
  //   setTargetProgress(newTargetProgress);
  // }, [certificates]);

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

  // const handleFileSelect = (e) => {
  //   const files = Array.from(e.target.files);
  //   setStagedFiles(files);
  // };

  // const handleUploadConfirm = () => {
  //   if (stagedFiles.length === 0) {
  //     alert("Please choose a file.");
  //     return;
  //   }

  //   const newEntries = stagedFiles.map(file => ({
  //     file: file,
  //     description: description
  //   }));

  //   setCertificates(prev => [...prev, ...newEntries]);
  //   setStagedFiles([]);
  //   setDescription("");
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = null;
  //   }
  // };

  // const handleRemoveCertificate = (indexToRemove) => {
  //   setCertificates(prev => prev.filter((_, index) => index !== indexToRemove));
  // };

  // const canProceed = certificates.length > 0;

  // const openModal = (cert) => {
  //   setSelectedImage(cert);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedImage(null);
  // };
// Use Zustand store for form state
const {
  certificates,
  description,
  stagedFiles,
  setDescription,
  setStagedFiles,
  addCertificates,
  removeCertificate,
} = useFormStore();

const [progress, setProgress] = useState(55); // Local state for progress animation
const [targetProgress, setTargetProgress] = useState(55); // Local state for progress target
const [isAnimating, setIsAnimating] = useState(false); // Local state for animation control
const [isModalOpen, setIsModalOpen] = useState(false); // Local state for modal visibility
const [selectedImage, setSelectedImage] = useState(null); // Local state for selected image in modal
const fileInputRef = useRef(null);

useEffect(() => {
  const baseProgress = 55;
  const maxProgress = 69;
  let addedProgress = 0;

  if (certificates.length > 0) {
    addedProgress += 7;
    if (certificates.some((cert) => cert.description?.trim() !== "")) {
      addedProgress += 7;
    }
  }

  const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);
  setTargetProgress(newTargetProgress);
}, [certificates]);

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

const handleFileSelect = (e) => {
  const files = Array.from(e.target.files);
  setStagedFiles(files);
};

const handleUploadConfirm = () => {
  if (stagedFiles.length === 0) {
    alert("Please choose a file.");
    return;
  }

  const newEntries = stagedFiles.map((file) => ({
    file: file,
    description: description,
    fileName: file.name, // Store file name for persistence
    fileType: file.type, // Store file type for rendering
  }));

  addCertificates(newEntries); // Use the store's action
  setStagedFiles([]);
  setDescription("");
  if (fileInputRef.current) {
    fileInputRef.current.value = null;
  }
};

const handleRemoveCertificate = (index) => {
  removeCertificate(index); // Use the store's action
};

const canProceed = certificates.length > 0;

const openModal = (cert) => {
  if (!cert.file) {
    alert("File preview is not available. Please re-upload the file.");
    return;
  }
  setSelectedImage(cert);
  setIsModalOpen(true);
};

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

      {/* Form Section */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div
          className="w-full rounded-lg relative overflow-hidden shadow-lg"
          style={{
            background: "rgba(235, 245, 255, 0.5)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            minHeight: "480px",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="certificates-content"
              className="p-8 flex flex-col h-full"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-xl font-semibold mb-4">Certificates</h2>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="font-medium">Upload Certificate:</label>
                  <label className="bg-blue-600 text-white px-4 py-1 rounded-2xl cursor-pointer -ml-1">
                    Choose File
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileSelect}
                      multiple
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                  </label>
                  {stagedFiles.length > 0 && (
                    <span className="text-sm text-gray-600">{stagedFiles.length} file selected</span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-[250px]">
                  <label className="font-medium whitespace-nowrap">Description:</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={stagedFiles.length === 0 ? "Please Select File" : "Enter description for selected file"}
                    className="flex-grow border p-1 px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={stagedFiles.length === 0}
                  />
                </div>
                <button
                  onClick={handleUploadConfirm}
                  disabled={stagedFiles.length === 0}
                  className="bg-blue-600 text-white px-5 py-1.5 rounded-2xl cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Upload Certificate
                </button>
              </div>

              <div className="w-full flex-grow bg-white border rounded overflow-auto p-5 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {certificates.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center text-center h-60 text-gray-400">
                      No certificates uploaded. Upload to preview here.
                    </div>
                  ) : (
                    certificates.map((certData, index) => (
                      <motion.div
                        key={index}
                        className="relative flex flex-col items-center border p-3 rounded shadow bg-gray-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="w-full h-[150px] bg-white border rounded flex items-center justify-center overflow-hidden mb-2 cursor-pointer"
                          onClick={() => openModal(certData)}
                        >
                          {certData.file.type.startsWith("image/") ? (
                            <Image
                              src={URL.createObjectURL(certData.file)}
                              alt={`Certificate ${index + 1}`}
                              width={150}
                              height={150}
                              className="object-contain max-w-full max-h-full"
                            />
                          ) : (
                            <span className="text-gray-500 text-center text-sm p-2">
                              Preview not available ({certData.file.type})
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-center text-sm truncate w-full px-1" title={certData.file.name}>
                          {certData.file.name}
                        </p>
                        <p className="text-xs text-gray-600 text-center mt-1 px-1 break-words w-full" title={certData.description || "No description"}>
                          {certData.description || "(No description)"}
                        </p>
                        <button
                          onClick={() => handleRemoveCertificate(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-xs"
                          aria-label="Remove certificate"
                        >
                          <FaTrashAlt />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons OUTSIDE glass container */}
        <div className="flex justify-between items-center mt-6 px-2 sm:px-4">
          <Link
            href="/portfolio_creation_page/4_education"
            className="p-2 flex items-center justify-center rounded-md hover:transition-all duration-300 group"
          >
            <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300" />
          </Link>
          <Link
            href="/portfolio_creation_page/6_work_experience"
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

      {/* AI Mascot Placeholder */}
      <div className="absolute top-4 right-4 z-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="text-2xl">🤖</div>
        </div>
      </div>
    </div>
  );
}
