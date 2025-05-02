import { create } from "zustand";

const useFormStore = create((set) => ({
  // Form state
  firstName: "",
  middleName: "",
  surname: "",
  suffix: "",
  userImage: null,

  // Actions to update form state
  setFirstName: (value) => set({ firstName: value }),
  setMiddleName: (value) => set({ middleName: value }),
  setSurname: (value) => set({ surname: value }),
  setSuffix: (value) => set({ suffix: value }),
  setUserImage: (value) => set({ userImage: value }),

  // Personal Information Page State
  email: "",
  contactNumber: "",
  socials: [{ platform: "", url: "" }],

  // Actions for Personal Information Page
  setEmail: (value) => set({ email: value }),
  setContactNumber: (value) => set({ contactNumber: value }),
  setSocials: (value) => set({ socials: value }),
  addSocialField: () =>
    set((state) => ({
      socials: [...state.socials, { platform: "", url: "" }],
    })),
  removeSocialField: (index) =>
    set((state) => {
      const newSocials = [...state.socials];
      newSocials.splice(index, 1);
      return { socials: newSocials };
    }),
  handleSocialChange: (index, field, value) =>
    set((state) => {
      const newSocials = [...state.socials];
      newSocials[index][field] = value;
      return { socials: newSocials };
    }),
// Address Page State
country: "",
province: "",
city: "",
postal: "",
    // Actions for Address Page
  setCountry: (value) => set({ country: value }),
  setProvince: (value) => set({ province: value }),
  setCity: (value) => set({ city: value }),
  setPostal: (value) => set({ postal: value }),

  // Education Page State
  elementary: "",
  juniorHigh: "",
  seniorHigh: "",
  degreeLevel: {
    undergraduate: { checked: false, university: "" },
    masters: { checked: false, university: "" },
    doctoral: { checked: false, university: "" },
  },

  // Actions for Education Page
  setElementary: (value) => set({ elementary: value }),
  setJuniorHigh: (value) => set({ juniorHigh: value }),
  setSeniorHigh: (value) => set({ seniorHigh: value }),
  setDegreeLevel: (value) => set({ degreeLevel: value }),
  updateDegreeLevel: (level, field, value) =>
    set((state) => ({
      degreeLevel: {
        ...state.degreeLevel,
        [level]: { ...state.degreeLevel[level], [field]: value },
      },
    })),

    // Certificates Page State
  certificates: [],
  description: "",
  stagedFiles: [],

  // Actions for Certificates Page
  setCertificates: (value) => set({ certificates: value }),
  setDescription: (value) => set({ description: value }),
  setStagedFiles: (value) => set({ stagedFiles: value }),
  addCertificates: (newEntries) =>
    set((state) => ({
      certificates: [...state.certificates, ...newEntries],
    })),
  removeCertificate: (index) =>
    set((state) => ({
      certificates: state.certificates.filter((_, i) => i !== index),
    })),

    // Work Experience Page State
  jobs: [""],
  skills: [""],
  projects: [
    {
      name: "",
      logo: null,
      description: "",
      link: "",
    },
  ],
  projectLinkErrors: [false],

  // Actions for Work Experience Page
  setJobs: (value) => set({ jobs: value }),
  setSkills: (value) => set({ skills: value }),
  setProjects: (value) => set({ projects: value }),
  setProjectLinkErrors: (value) => set({ projectLinkErrors: value }),
  addJob: () => set((state) => ({ jobs: [...state.jobs, ""] })),
  updateJob: (index, value) =>
    set((state) => {
      const newJobs = [...state.jobs];
      newJobs[index] = value;
      return { jobs: newJobs };
    }),
  removeJob: (index) =>
    set((state) => {
      if (state.jobs.length > 1) {
        const newJobs = [...state.jobs];
        newJobs.splice(index, 1);
        return { jobs: newJobs };
      }
      return state;
    }),
  addSkill: () => set((state) => ({ skills: [...state.skills, ""] })),
  updateSkill: (index, value) =>
    set((state) => {
      const newSkills = [...state.skills];
      newSkills[index] = value;
      return { skills: newSkills };
    }),
  removeSkill: (index) =>
    set((state) => {
      if (state.skills.length > 1) {
        const newSkills = [...state.skills];
        newSkills.splice(index, 1);
        return { skills: newSkills };
      }
      return state;
    }),
  addProject: () =>
    set((state) => ({
      projects: [
        ...state.projects,
        { name: "", logo: null, description: "", link: "" },
      ],
      projectLinkErrors: [...state.projectLinkErrors, false],
    })),
  updateProject: (index, field, value) =>
    set((state) => {
      const newProjects = [...state.projects];
      newProjects[index][field] = value;
      const newErrors = [...state.projectLinkErrors];
      if (field === "link") {
        const isValid = !value || value.startsWith("https://");
        newErrors[index] = !isValid; // Error flag to true if NOT valid
      }
      return { projects: newProjects, projectLinkErrors: newErrors };
    }),
  removeProject: (index) =>
    set((state) => {
      if (state.projects.length > 1) {
        const newProjects = state.projects.filter((_, i) => i !== index);
        const newErrors = state.projectLinkErrors.filter((_, i) => i !== index);
        return { projects: newProjects, projectLinkErrors: newErrors };
      }
      return state;
    }),

// Template Selection Page State
selectedTemplate: null,

    // Actions for Template Selection Page
  setSelectedTemplate: (value) => set({ selectedTemplate: value }),
  toggleTemplate: (templateId) =>
    set((state) => ({
      selectedTemplate: state.selectedTemplate === templateId ? null : templateId,
    })),

    resetForm: () =>
        set({
          firstName: "",
          middleName: "",
          surname: "",
          suffix: "",
          userImage: null,
          email: "",
          contactNumber: "",
          socials: [{ platform: "", url: "" }],
          country: "",
          province: "",
          city: "",
          postal: "",
          elementary: "",
          juniorHigh: "",
          seniorHigh: "",
          degreeLevel: {
            undergraduate: { checked: false, university: "" },
            masters: { checked: false, university: "" },
            doctoral: { checked: false, university: "" },
          },
          certificates: [],
          description: "",
          stagedFiles: [],
          jobs: [""],
          skills: [""],
          projects: [{ name: "", logo: null, description: "", link: "" }],
          projectLinkErrors: [false],
          selectedTemplate: null,
        }),
}));

export default useFormStore;