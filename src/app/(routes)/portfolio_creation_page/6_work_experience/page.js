"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { FaPlus } from "react-icons/fa";
import { FcBriefcase, FcLeft } from "react-icons/fc";

export default function WorkExperiencePage() {
  const [jobs, setJobs] = useState([""]);
  const [skills, setSkills] = useState([""]);
  const [projects, setProjects] = useState([{
    name: "",
    logo: null,
    description: "",
    link: ""
  }]);
  const [progress, setProgress] = useState(69);
  const [targetProgress, setTargetProgress] = useState(69);
  const [projectLinkErrors, setProjectLinkErrors] = useState([false]);

  useEffect(() => {
    const baseProgress = 69; // Progress starts at 69%
    const maxProgress = 83;  // Progress ends at 83%
    let addedProgress = 0;
    const progressForJobs = 5;
    const progressForSkills = 4;
    const progressForProjects = 5;

    // Add progress if at least one job exists with content
    if (jobs.some(j => j.trim() !== "")) {
      addedProgress += progressForJobs;
    }
    // Add progress if at least one skill exists with content
    if (skills.some(s => s.trim() !== "")) {
      addedProgress += progressForSkills;
    }
    // Add progress if at least one project exists with a name
    // (Could add more checks for logo/desc/link if needed for progress)
    if (projects.some(p => p.name.trim() !== "")) {
      addedProgress += progressForProjects;
    }

    // Calculate the final target progress
    const newTargetProgress = Math.min(maxProgress, baseProgress + addedProgress);
    setTargetProgress(newTargetProgress);
  }, [jobs, skills, projects]);

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

  const addJob = () => setJobs([...jobs, ""]);
  const updateJob = (index, value) => {
    const newJobs = [...jobs];
    newJobs[index] = value;
    setJobs(newJobs);
  };
  const removeJob = (index) => {
    if (jobs.length > 1) {
      const newJobs = [...jobs];
      newJobs.splice(index, 1);
      setJobs(newJobs);
    }
  };

  const addSkill = () => setSkills([...skills, ""]);
  const updateSkill = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const removeSkill = (index) => {
    if (skills.length > 1) {
      const newSkills = [...skills];
      newSkills.splice(index, 1);
      setSkills(newSkills);
    }
  };

  const addProject = () => {
    setProjects([...projects, {
      name: "",
      logo: null,
      description: "",
      link: ""
    }]);
    setProjectLinkErrors(prevErrors => [...prevErrors, false]);
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);

    if (field === 'link') {
      const isValid = !value || value.startsWith("https://");
      const newErrors = [...projectLinkErrors];
      newErrors[index] = !isValid; //Error flag to true if NOT valid
      setProjectLinkErrors(newErrors);
    }
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      const newProjects = projects.filter((_, i) => i !== index);
      setProjects(newProjects);

      const newErrors = projectLinkErrors.filter((_, i) => i !== index);
      setProjectLinkErrors(newErrors);
    }
  };

  const canProceed =
    // Must have at least one non-empty job entry
    jobs.some(job => job.trim()) &&
    // Must have at least one non-empty skill entry
    skills.some(skill => skill.trim()) &&
    // CHANGED: Must have at least one project where logo, description, AND a valid link are present
    projects.some(project =>
      project.logo !== null &&                     // Check if logo file object exists
      project.description.trim() !== "" &&       // Check if description is non-empty
      project.link.startsWith("https://")        // Check if link starts with https://
      && project.name.trim() !== ""
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
      {/* Background logo */}
      <div className="fixed inset-0 z-0 opacity-45 flex items-center justify-center pointer-events-none">
        <div className="w-[937px] h-[937px] flex-shrink-0 aspect-square">
          <img src="/gear_folio_logo.svg" alt="Background logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Header */}
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
                <img src="/gear.svg" width={20} height={20} alt="Progress indicator" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <span className="text-lg text-blue-600 font-bold">{Math.round(progress)}% completed</span>
          </div>
        </div>
      </div>

      {/* Form */}
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Work Experience</h2>
            <div className="space-y-6">
              {/* Jobs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job:</label>
                {jobs.map((job, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={job}
                        onChange={(e) => updateJob(index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeJob(index)}
                          className="px-2 py-1 text-xs bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {index === jobs.length - 1 && (
                      <button
                        type="button"
                        onClick={addJob}
                        className="text-xs text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1 px-2 py-1 -ml-1"
                      >
                        <span>Add job</span>
                        <FaPlus size={10} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill:</label>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="px-2 py-1 text-xs bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      {index === skills.length - 1 && (
                        <button
                          type="button"
                          onClick={addSkill}
                          className="text-xs text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1 px-2 py-1 -ml-1"
                        >
                          <span>Add skill</span>
                          <FaPlus size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">Projects</h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="space-y-3 border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-4">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Project Name:</label>
                          <input
                            type="text"
                            value={project.name}
                            onChange={(e) => updateProject(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Logo:</label>
                          <div className="flex items-center gap-2 w-full"> {/* Parent flex container */}
                            <input
                              type="file"
                              onChange={(e) => updateProject(index, 'logo', e.target.files[0])}
                              className="hidden"
                              id={`project-logo-upload-${index}`}
                              accept="image/*" // Example: accept only images
                            />
                            {/* CHANGED: Label styled as button, FIXED text, intrinsic width */}
                            <label
                              htmlFor={`project-logo-upload-${index}`}
                              className="w-fit px-4 py-1.5 bg-blue-600 text-white text-center rounded-2xl cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap" // CHANGED: w-fit, whitespace-nowrap; REMOVED: flex-grow, truncate
                            >
                              {project.logo ? "Choose Image" : "Choose Image"}
                            </label>

                            {/* ADDED: Conditionally display filename next to button */}
                            {project.logo && (
                              <span className="text-sm text-gray-700 truncate flex-1 min-w-0" title={project.logo.name}>
                                {project.logo.name}
                              </span>
                            )}

                            {/* Clear button appears after filename if logo exists */}
                            {project.logo && (
                              <button
                                type="button"
                                onClick={() => updateProject(index, 'logo', null)}
                                // Optional: Slightly improved styling for clear button
                                className="px-2 py-1 text-xs bg-gray-100 text-red-700 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0"
                                title="Clear selected logo"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Description:</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          className="w-full max-w-5xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 h-24 resize-none"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Link:</label> {/* Reduced mb */}
                          <input
                            type="url"
                            value={project.link}
                            onChange={(e) => updateProject(index, 'link', e.target.value)}
                            className={`w-[919px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                              ${projectLinkErrors[index]
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' // Red border/ring on error
                                : 'focus:outline-none focus:ring-2 focus:ring-blue-500' // Default border/ring
                              }`}
                            placeholder="https://example.com"
                            pattern="https://.*" // Keep pattern for browser hints/validation
                            title="Link must start with https://" // Updated title
                          />
                          {/* ADDED: Conditional warning message */}
                          {projectLinkErrors[index] && (
                            <p className="text-xs text-red-600 mt-1">
                              Warning: Link must start with "https://"
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1 ml-4 mt-5">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeProject(index)}
                              className="px-2 py-1 text-xs bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors"
                            >
                              Remove Project
                            </button>
                          )}
                        </div>
                      </div>
                      {index === projects.length - 1 && (
                        <button
                          type="button"
                          onClick={addProject}
                          className="text-xs text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1 px-2 py-1 -ml-1"
                        >
                          <span>Add project</span>
                          <FaPlus size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Link href="/portfolio_creation_page/5_upload_certificates"
            className="p-2 flex items-center justify-center rounded-md bg-transparent hover:transition-all duration-300 group">
            <FcLeft className="text-4xl group-hover:scale-125 transition-transform duration-300" />
          </Link>
          <Link
            href="/portfolio_creation_page/7_template_section"
            className={`py-4 px-8 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${canProceed
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-100 cursor-not-allowed"
              }`}
            onClick={(e) => !canProceed && e.preventDefault()}
          >
            Next
          </Link>
        </div>
      </div>

      {/* Mascot */}
      <div className="absolute top-4 right-4 z-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="text-2xl">🤖</div>
        </div>
      </div>
    </div>
  );
}