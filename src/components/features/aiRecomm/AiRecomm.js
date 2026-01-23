'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Define InputField OUTSIDE the AiRecomm component
const InputField = ({ label, placeholder, value, onChange, helpText }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {helpText && (
        <span className="text-xs text-gray-500 ml-1">{helpText}</span>
      )}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2E8BC0] focus:border-[#2E8BC0] transition-colors duration-150"
    />
  </div>
);

function AiRecomm() {
  const router = useRouter();

  // State for form inputs
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [currentPosition, setCurrentPosition] = useState(''); // Mapped to 'Current Education'
  const [desiredRole, setDesiredRole] = useState('');
  const [currentSkillLevel, setCurrentSkillLevel] = useState('');
  const [presentLocation, setPresentLocation] = useState('');
  const [recommendationResult, setRecommendationResult] = useState(null); // To store the AI recommendation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAIRecommendation = async () => {
    setLoading(true);
    setError(null);

    const processedSkills = skills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s);
    const processedInterests = interests
      .split(',')
      .map((i) => i.trim())
      .filter((i) => i);

    const AIPrompt = {
      skills: processedSkills,
      interests: processedInterests,
      currentPosition,
      desiredRole,
      // Consider whether to include these based on your backend model
      // currentSkillLevel,
      // presentLocation,
    };

    try {
      const response = await fetch("https://gearfolio-ai.onrender.com/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ AIPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch recommendation: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      setRecommendationResult(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching AI recommendation:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = () => {
    console.log('Form Data Submitted for AI Recommendation:', {
      skills: skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s),
      interests: interests
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i),
      current_position: currentPosition,
      desired_role: desiredRole,
      current_skill_level: currentSkillLevel,
      present_location: presentLocation,
    });
    getAIRecommendation(); // Call the AI recommendation function on submit
  };

  const handleLocateCareerClick = () => {
    console.log('Locate Career Now Clicked - Navigating...');
    router.push('/AIRecommFindCareer');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section: Form */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <div className="flex items-center mb-6">
              <Image
                src="/aiRecommButton.svg" // Assuming this is the icon for AI Recommendation
                alt="AI Recommendation Icon"
                width={48}
                height={48}
                className="mr-3"
              />
              <h1 className="text-3xl font-bold text-[#2E8BC0] text-shadow-[0px_2px_2px_rgba(0,_0,_0,_0.1)]">
                AI Recommendation
              </h1>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Get personalized career recommendations based on your skills,
              interests, and current education level. Fill in the details below
              to receive AI-driven insights tailored to your learning journey
              and professional aspirations.
            </p>

            <div className="space-y-5 text-black">
              <InputField
                label="Skills"
                helpText="(e.g., Python, JavaScript, SQL)"
                placeholder="Enter comma-separated skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <InputField
                label="Interests"
                helpText="(e.g., AI, Web Development, Data Science)"
                placeholder="Enter comma-separated interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
              <InputField
                label="Current Education / Position"
                placeholder="Enter your current education or position"
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
              />
              <InputField
                label="Current Skill Level"
                placeholder="e.g., Beginner, Intermediate, Advanced"
                value={currentSkillLevel}
                onChange={(e) => setCurrentSkillLevel(e.target.value)}
              />
              <InputField
                label="Present Location"
                placeholder="e.g., Cebu City, Philippines"
                value={presentLocation}
                onChange={(e) => setPresentLocation(e.target.value)}
              />
              <InputField
                label="Desired Position / Job Role"
                placeholder="e.g., Software Engineer, UX Designer"
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value)}
              />

              <button
                onClick={handleFormSubmit}
                className="w-full mt-6 bg-[#2E8BC0] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2474A5] transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
                disabled={loading}
              >
                <span className="mr-2">Find My Career Path</span>
                <Image
                  src="/pencil.svg"
                  alt="Find Career Icon"
                  width={18}
                  height={18}
                />
              </button>

              {loading && <p className="text-center text-gray-500">Loading recommendation...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
            </div>
          </div>

          {/* Right Section: Output/Placeholder */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center text-center min-h-[400px] md:min-h-0">
            {recommendationResult ? (
              <div>
                <h2 className="text-3xl font-semibold text-[#2E8BC0] mb-6">
                  AI Recommendation
                </h2>
                <pre className="text-left text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(recommendationResult, null, 2)}
                </pre>
                {/* You can format the recommendationResult more nicely here */}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center my-auto">
                <h2 className="text-3xl font-semibold text-[#2E8BC0] mb-6">
                  Your Career Path
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Recommendations based on your input will be shown here.
                </p>
                <button
                  onClick={handleLocateCareerClick}
                  className="bg-[#2E8BC0] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#2474A5] transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Locate Career Now
                </button>
              </div>
            )}
            <div className="ml-auto pt-8">
              <Image
                src="/gearfolio.svg"
                alt="Gearfolio Logo"
                width={80}
                height={58}
                className="opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiRecomm;