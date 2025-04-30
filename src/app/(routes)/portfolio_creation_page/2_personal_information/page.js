"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { FaFacebook, FaLinkedin, FaInstagram, FaPlus, FaTwitter } from "react-icons/fa";
import { FcBriefcase, FcLeft } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";

export default function PersonalInformationPage() {
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [socials, setSocials] = useState([{ platform: "", url: "" }]);
  const [progress, setProgress] = useState(17);
  const [targetProgress, setTargetProgress] = useState(17);
  const [urlErrors, setUrlErrors] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Validate URLs when they change
  useEffect(() => {
    const newErrors = socials.map(social => {
      if (!social.url) return false;
      try {
        new URL(social.url);
        return false;
      } catch {
        return true;
      }
    });
    setUrlErrors(newErrors);
  }, [socials]);

  // Calculate target progress
  useEffect(() => {
    const baseProgress = 17;
    const maxProgress = 31;
    let addedProgress = 0;

    const emailPoints = 5;
    const contactPoints = 5;
    const socialsPoints = 4;

    if (email.trim() !== "") {
      addedProgress += emailPoints;
    }
    if (contactNumber.trim() !== "") {
      addedProgress += contactPoints;
    }
    if (socials.some((s, index) => s.platform && s.url.trim() && !urlErrors[index])) {
      addedProgress += socialsPoints;
    }

    const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);
    setTargetProgress(newTargetProgress);
  }, [email, contactNumber, socials, urlErrors]);

  // Animate progress
  useEffect(() => {
    if (Math.abs(progress - targetProgress) < 0.1) {
      setProgress(targetProgress);
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      const diff = targetProgress - progress;
      const step = Math.abs(diff) < 0.5 ? diff : diff * 0.1;
      setProgress(prev => Math.round((prev + step) * 10) / 10);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [progress, targetProgress]);

  const addSocialField = () => {
    setSocials([...socials, { platform: "", url: "" }]);
    setUrlErrors([...urlErrors, false]);
  };

  const removeSocialField = (index) => {
    const newSocials = [...socials];
    newSocials.splice(index, 1);
    setSocials(newSocials);

    const newErrors = [...urlErrors];
    newErrors.splice(index, 1);
    setUrlErrors(newErrors);
  };

  const handleSocialChange = (index, field, value) => {
    const newSocials = [...socials];
    newSocials[index][field] = value;
    setSocials(newSocials);
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'facebook': return <FaFacebook className="text-blue-600" />;
      case 'instagram': return <FaInstagram className="text-pink-600" />;
      case 'linkedin': return <FaLinkedin className="text-blue-700" />;
      case 'twitter': return <FaTwitter className="text-sky-500" />;
      case 'other': return <FcBriefcase className="text-green-600" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const canProceed = email.trim() && contactNumber.trim() &&
    socials.every((s, i) => !s.url || (s.url && !urlErrors[i]));

  const handleContactNumberChange = (event) => {
    const rawValue = event.target.value;
    const numericValue = rawValue.replace(/\D/g, '');
    const limitedValue = numericValue.slice(0, 11);
    setContactNumber(limitedValue);
  };

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
          <img
            src="/gear_folio_logo.svg"
            alt="Background logo"
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
                <img src="/gear.svg" width={20} height={20} alt="Progress indicator" />
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
              key="personal-info"
              className="p-10 h-full relative"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">Personal Information</h2>

              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                {/* Contact Number */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number:
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={contactNumber}
                    onChange={handleContactNumberChange}
                    maxLength={11}
                    placeholder="09XX-XXX-XXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    required
                  />
                </motion.div>

                {/* Social Media Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Social Media:
                  </label>
                  <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                    {socials.map((social, index) => (
                      <motion.div 
                        key={index} 
                        className="flex gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div className="flex items-center px-2 border border-gray-300 rounded-md bg-white">
                          {getPlatformIcon(social.platform)}
                          <select
                            value={social.platform}
                            onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                            className="pl-2 pr-8 py-2 focus:outline-none bg-transparent text-gray-900 appearance-none cursor-pointer"
                          >
                            <option value="">-Choose Platform-</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="twitter">Twitter/X</option>
                            <option value="other">Other/s</option>
                          </select>
                        </div>
                        <div className="flex-1 relative">
                          <input
                            type="url"
                            placeholder={social.platform ? "https://example.com/profile" : "Please Select a Platform"} 
                            value={social.url}
                            onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                            className={`w-full px-3 py-2 border ${urlErrors[index] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed`}
                            pattern="https?://.+"
                            disabled={!social.platform}
                          />
                          {urlErrors[index] && (
                            <div className="text-xs text-gray-500 mt-1 px-2 py-1 bg-gray-50 rounded">
                              <span className="text-red-500">!</span> Please enter a valid URL including "https://"
                            </div>
                          )}
                        </div>
                        {socials.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSocialField(index)}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors cursor-pointer"
                            aria-label="Remove social link"
                          >
                            Remove
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    onClick={addSocialField}
                    className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlus /> Add another social link
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="absolute -bottom-14 left-0 flex gap-4">
          <Link
            href="/portfolio_creation_page/1_name"
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
            href="/portfolio_creation_page/3_address"
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