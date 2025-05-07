import { useState } from 'react';

export default function aiRecommFindCareer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    fullTime: false,
    partTime: false,
    remote: false,
    onSite: false,
  });
  const [view, setView] = useState('list'); // 'list' or 'map'

  const jobListings = [
    {
      id: 1,
      company: 'TechCorp',
      logo: '/api/placeholder/50/50',
      title: 'Senior AI Engineer',
      salary: '$120K - $150K',
      distance: '0.5 mi',
      rating: 4.8,
      time: "Open 'till 6pm",
      skills: ['Python', 'TensorFlow', 'NLP'],
      posted: '2 days ago',
      type: 'Full-time',
    },
    {
      id: 2,
      company: 'DataSystems',
      logo: '/api/placeholder/50/50',
      title: 'ML Research Scientist',
      salary: '$130K - $160K',
      distance: '0.7 mi',
      rating: 4.9,
      time: "Open 'till 5pm",
      skills: ['PyTorch', 'Research', 'Computer Vision'],
      posted: '1 day ago',
      type: 'Full-time',
    },
    {
      id: 3,
      company: 'AIStartup',
      logo: '/api/placeholder/50/50',
      title: 'AI Product Manager',
      salary: '$110K - $140K',
      distance: '0.9 mi',
      rating: 4.7,
      time: "Open 'till 7pm",
      skills: ['Product Management', 'AI', 'Agile'],
      posted: '3 days ago',
      type: 'Full-time',
    },
    {
      id: 4,
      company: 'CloudTech',
      logo: '/api/placeholder/50/50',
      title: 'AI Solutions Architect',
      salary: '$140K - $170K',
      distance: '1.2 mi',
      rating: 5.0,
      time: "Open 'till 6pm",
      skills: ['Cloud', 'Architecture', 'ML Ops'],
      posted: 'Just now',
      type: 'Contract',
    },
    {
      id: 5,
      company: 'InnovateLabs',
      logo: '/api/placeholder/50/50',
      title: 'NLP Engineer',
      salary: '$115K - $145K',
      distance: '1.5 mi',
      rating: 4.6,
      time: "Open 'till 5:30pm",
      skills: ['NLP', 'Python', 'Deep Learning'],
      posted: '1 week ago',
      type: 'Remote',
    },
    {
      id: 6,
      company: 'FutureTech',
      logo: '/api/placeholder/50/50',
      title: 'Computer Vision Engineer',
      salary: '$125K - $155K',
      distance: '1.8 mi',
      rating: 4.7,
      time: "Open 'till 6:30pm",
      skills: ['Computer Vision', 'C++', 'CUDA'],
      posted: '2 days ago',
      type: 'Part-time',
    },
  ];

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters({
      ...selectedFilters,
      [filter]: !selectedFilters[filter],
    });
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < Math.floor(rating) ? '#FFD700' : 'none'}
          stroke="#FFD700"
          strokeWidth="1"
          className="mr-1"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }
    return stars;
  };

  const renderJobListings = () => {
    return jobListings.map((job) => (
      <div
        key={job.id}
        className={`p-3 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 cursor-pointer ${
          selectedJob?.id === job.id ? 'bg-blue-50' : ''
        }`}
        onClick={() => handleJobSelect(job)}
      >
        <div className="rounded-lg p-3">
          <div className="flex">
            {/* Company logo */}
            <div className="w-12 h-12 rounded-lg bg-white shadow-sm overflow-hidden mr-3 flex-shrink-0">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Job details */}
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-semibold text-gray-900">
                      {job.company}
                    </h3>
                    <p className="text-sm font-bold text-gray-800">
                      {job.title}
                    </p>
                    <p className="text-sm text-gray-600">{job.salary}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"></path>
                    </svg>
                    {job.distance}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap mt-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mr-1 mb-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer info */}
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="text-green-600">{job.time}</span>
                  <div className="flex items-center">
                    <span
                      className={`px-2 py-1 rounded-full mr-2 ${
                        job.type === 'Full-time'
                          ? 'bg-blue-100 text-blue-700'
                          : job.type === 'Part-time'
                          ? 'bg-purple-100 text-purple-700'
                          : job.type === 'Remote'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {job.type}
                    </span>
                    <span className="text-gray-500">{job.posted}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="fixed top-0 left-0 right-0 bg-white py-3 px-4 shadow-sm z-20 md:hidden">
        <div className="flex justify-between items-center">
          <button
            className={`px-4 py-1 text-sm font-medium rounded-full ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setView('list')}
          >
            List
          </button>
          <button
            className={`px-4 py-1 text-sm font-medium rounded-full ${
              view === 'map'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setView('map')}
          >
            Map
          </button>
        </div>
      </div>

      {/* Left Panel - Job Listings */}
      <div
        className={`${
          view === 'map' ? 'hidden' : 'block'
        } md:block w-full md:w-96 bg-white shadow-md rounded-lg overflow-hidden m-2 flex flex-col mt-12 md:mt-2`}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Job title, company, or keyword"
              className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="absolute right-3 top-3">
                <button
                  onClick={handleClearSearch}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <button
              className="flex items-center text-sm text-gray-700 font-medium hover:text-blue-600"
              onClick={toggleFilter}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
              {Object.values(selectedFilters).some((filter) => filter) && (
                <span className="ml-2 w-5 h-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
                  {
                    Object.values(selectedFilters).filter((filter) => filter)
                      .length
                  }
                </span>
              )}
            </button>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select className="text-sm border-none bg-transparent text-gray-700 focus:outline-none focus:ring-0">
                <option>Relevance</option>
                <option>Distance</option>
                <option>Rating</option>
                <option>Date Posted</option>
              </select>
            </div>
          </div>

          {/* Filter Options */}
          {filterOpen && (
            <div className="mt-3 bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Job Type
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600"
                    checked={selectedFilters.fullTime}
                    onChange={() => handleFilterChange('fullTime')}
                  />
                  <span>Full-time</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600"
                    checked={selectedFilters.partTime}
                    onChange={() => handleFilterChange('partTime')}
                  />
                  <span>Part-time</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600"
                    checked={selectedFilters.remote}
                    onChange={() => handleFilterChange('remote')}
                  />
                  <span>Remote</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600"
                    checked={selectedFilters.onSite}
                    onChange={() => handleFilterChange('onSite')}
                  />
                  <span>On-site</span>
                </label>
              </div>
              <div className="flex justify-end mt-3">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={toggleFilter}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="px-4 py-3 text-sm text-gray-600 font-medium border-b border-gray-100">
          <span className="mr-1">6 Results found</span>
          <span className="text-blue-600">near you</span>
        </div>

        {/* Job Listings */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-200px)] md:h-[calc(100vh-160px)]">
          {renderJobListings()}
        </div>
      </div>

      {/* Right Panel - Map View or Job Details */}
      <div
        className={`${
          view === 'list' ? 'hidden' : 'block'
        } md:block flex-1 bg-white m-2 rounded-lg overflow-hidden shadow-md relative mt-12 md:mt-2`}
      >
        {selectedJob ? (
          <div className="h-full flex flex-col">
            {/* Job Detail Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <button
                className="text-gray-600 hover:text-gray-800 flex items-center"
                onClick={() => setSelectedJob(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span className="ml-2">Back to Map</span>
              </button>
              <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
              <button className="text-gray-600 hover:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>

            {/* Job Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-lg bg-white shadow-sm overflow-hidden mr-4 flex-shrink-0">
                  <img
                    src={selectedJob.logo}
                    alt={`${selectedJob.company} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedJob.title}
                  </h3>
                  <p className="text-lg text-gray-700">{selectedJob.company}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {renderStars(selectedJob.rating)}
                    </div>
                    <span className="text-gray-700 ml-2">
                      {selectedJob.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="text-md font-semibold text-gray-900">
                      {selectedJob.salary}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="text-md font-semibold text-gray-900">
                      {selectedJob.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-md font-semibold text-gray-900">
                      {selectedJob.distance} away
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="text-md font-semibold text-gray-900">
                      {selectedJob.posted}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h4>
                <p className="text-gray-700 mb-4">
                  We are looking for an experienced {selectedJob.title} to join
                  our team. The ideal candidate will have a strong background in
                  artificial intelligence and machine learning.
                </p>
                <p className="text-gray-700 mb-4">
                  You&apos;ll work on cutting-edge AI projects and collaborate
                  with a talented team of engineers and researchers to develop
                  innovative solutions.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Required Skills
                </h4>
                <div className="flex flex-wrap">
                  {selectedJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
                    Machine Learning
                  </span>
                  <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
                    Data Science
                  </span>
                  <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
                    Problem Solving
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Company Information
                </h4>
                <p className="text-gray-700 mb-4">
                  {selectedJob.company} is a leading technology company focused
                  on artificial intelligence and machine learning solutions.
                </p>
                <p className="text-gray-700">
                  We are dedicated to creating innovative AI technologies that
                  solve real-world problems.
                </p>
              </div>
            </div>

            {/* Apply Button */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-150">
                  Apply Now
                </button>
                <button className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-150">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A56E2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Map Search Bar */}
            <div className="absolute top-4 left-0 right-0 flex justify-center z-10">
              <div className="relative w-96">
                <div className="absolute left-3 top-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search this area"
                  className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  value={mapSearchQuery}
                  onChange={(e) => setMapSearchQuery(e.target.value)}
                />
                {mapSearchQuery && (
                  <div className="absolute right-3 top-3">
                    <button
                      onClick={() => setMapSearchQuery('')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Map View */}
            <div className="w-full h-full bg-white flex flex-col items-center justify-center">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4A56E2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-4"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                <p className="text-gray-700 mb-2">Map View</p>
                <p className="text-sm text-gray-500">
                  Select a location to see job listings
                </p>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col space-y-3">
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </button>
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </button>
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
