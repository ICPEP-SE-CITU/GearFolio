'use client';  // This tells Next.js that this is a client-side component
import styles from './porfoliopreview.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// Import icons for better UI
import { 
  FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt, 
  FaGraduationCap, FaBriefcase, FaTools, FaProjectDiagram, 
  FaCertificate, FaChevronLeft, FaChevronRight, FaExternalLinkAlt,
  FaUser
} from 'react-icons/fa';

// Mock data for testing
const mockData = {
  firstName: 'Jane',
  middleName: 'Alexandra',
  surname: 'Doe',
  suffix: 'PhD',
  email: 'jane.doe@example.com',
  phone: '09171234567',
  profileImage: '/gear.svg', // Use an existing SVG instead of wapanchman.jpg
  socials: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
    { platform: 'GitHub', url: 'https://github.com/janedoe' },
    { platform: 'Twitter', url: 'https://twitter.com/janedoe' }
  ],
  address: {
    country: 'Philippines',
    province: 'Cebu',
    city: 'Cebu City',
    postal: '6000'
  },
  education: [
    { school: 'Sunshine Elementary School', degree: 'Elementary', field: 'General', startDate: '2010-01-01', endDate: '2016-12-31' },
    { school: 'Horizon Junior High School', degree: 'Junior High', field: 'General', startDate: '2016-01-01', endDate: '2020-12-31' },
    { school: 'Skyline Senior High School', degree: 'Senior High', field: 'General', startDate: '2020-01-01', endDate: '2022-12-31' },
    { school: 'University of the Philippines', degree: 'undergraduate', field: 'Computer Science', startDate: '2022-01-01', endDate: '2026-12-31' },
    { school: 'MIT', degree: 'masters', field: 'Computer Science', startDate: '2026-01-01', endDate: '2028-12-31' },
    { school: 'Harvard University', degree: 'doctoral', field: 'Computer Science', startDate: '2028-01-01', endDate: '2032-12-31' }
  ],
  certificates: [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon', date: '2022-05-10', image: '/gear.svg' },
    { name: 'Google UX Design', issuer: 'Google', date: '2021-11-15', image: '/gear.svg' }
  ],
  workExperience: [
    { company: 'Tech Innovators Inc.', position: 'Senior Software Engineer', startDate: '2019-01-01', endDate: '2022-12-31', description: 'Led a team of 10 developers to build scalable web applications.' },
    { company: 'Creative Solutions', position: 'UI/UX Designer', startDate: '2017-06-01', endDate: '2018-12-31', description: 'Designed user interfaces for mobile and web platforms.' }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Figma', 'AWS', 'UI/UX Design', 'Project Management'],
  projects: [
    { name: 'E-Commerce Platform', link: 'https://ecommerce.example.com', image: '/gear.svg' },
    { name: 'Portfolio Generator', link: 'https://portfolio.example.com', image: '/gear.svg' }
  ]
};

function PortfolioPreviewPage() {
  const router = useRouter();
  const [portfolioData, setPortfolioData] = useState(null);
  const [currentEducationIndex, setCurrentEducationIndex] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [fullName, setFullName] = useState('');
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Education levels in order
  const educationLevels = ["Elementary", "Junior High", "Senior High", "Undergraduate", "Masters", "Doctoral"];
  
  // Handle generate portfolio function
  const handleGeneratePortfolio = () => {
    setIsGenerating(true);
    
    // Simulate generation process with timeout
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccessPopup(true);
      
      // Auto hide popup after 5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);
    }, 1500);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const storedData = localStorage?.getItem('portfolioData');
      console.log("Raw stored data:", storedData);
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          console.log("Found stored data:", parsedData);
          
          // Better handling of stored data format
          if (parsedData) {
            // Data is from the creation process
            const nameParts = (parsedData.name || '').split(' ') || [];
            
            // We'll keep the jobs array directly instead of trying to normalize it
            // This will make rendering simpler
            
            const convertedData = {
              firstName: nameParts[0] || '',
              middleName: nameParts.length > 2 ? nameParts[1] : '',
              surname: nameParts.length > 2 ? nameParts[2] : (nameParts.length > 1 ? nameParts[1] : ''),
              suffix: '',
              email: parsedData.email || '',
              phone: parsedData.phone || '',
              profileImage: parsedData.profileImage || parsedData.profile_image || '/gear.svg',
              socials: parsedData.socials || [],
              address: typeof parsedData.address === 'string' ? 
                { 
                  country: parsedData.address.split(', ')[2] || '',
                  province: parsedData.address.split(', ')[1] || '', 
                  city: parsedData.address.split(', ')[0] || '',
                  postal: ''
                } : 
                (parsedData.address || mockData.address),
              education: Array.isArray(parsedData.education) ? parsedData.education : [],
              // Keep the jobs array directly from creation
              jobs: Array.isArray(parsedData.jobs) ? parsedData.jobs.filter(job => job && job.trim()) : [],
              // Also keep the normalized work experience for fallback
              workExperience: Array.isArray(parsedData.workExperience) ? parsedData.workExperience : [],
              certificates: Array.isArray(parsedData.certificates) ? 
                parsedData.certificates.map(cert => {
                  // Skip imageFile which can't be serialized properly
                  const { imageFile, ...certData } = cert;
                  return {
                    name: cert.description || cert.name || "Certificate",
                    issuer: cert.issuer || "Issuing Organization",
                    date: cert.date || new Date().toISOString().split('T')[0]
                  };
                }) : [],
              skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
              projects: Array.isArray(parsedData.projects) ? parsedData.projects : []
            };
            
            console.log("Converted data for display:", convertedData);
            setPortfolioData(convertedData);
            setIsUsingMockData(false);
          } else {
            // Data is already in the right format or is mock data
            setPortfolioData(parsedData || mockData);
            setIsUsingMockData(parsedData ? false : true);
          }
        } catch (parseError) {
          console.error('Error parsing portfolio data:', parseError);
          setPortfolioData(mockData);
          setIsUsingMockData(true);
        }
      } else {
        console.log("No stored data found, using mock data");
        setPortfolioData(mockData);
        setIsUsingMockData(true);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setPortfolioData(mockData);
      setIsUsingMockData(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a cleanup function to remove localStorage data when leaving the page
  useEffect(() => {
    // Check if this is a fresh session - but DON'T clear data if we're coming from portfolio creation
    const isNewSession = !sessionStorage.getItem('portfolioSessionActive');
    const isFromCreation = sessionStorage.getItem('fromPortfolioCreation') === 'true';
    
    if (isNewSession && !isFromCreation) {
      // If this is a new session and we have localStorage data, 
      // it must be from a previous session - clear it
      if (localStorage.getItem('portfolioData')) {
        console.log("New session detected - clearing old portfolio data");
        localStorage.removeItem('portfolioData');
        setIsUsingMockData(true);
        setPortfolioData(mockData);
      }
      // Mark this session as active
      sessionStorage.setItem('portfolioSessionActive', 'true');
    }

    // Don't remove data when leaving the page if we're in the normal preview flow
    return () => {
      // Only clear if we're not in an active creation session
      if (!isFromCreation) {
        localStorage.removeItem('portfolioData');
        console.log("Portfolio data cleared from localStorage");
      }
    };
  }, []);

  useEffect(() => {
    if (portfolioData) {
      const { firstName, middleName, surname, suffix } = portfolioData;
      const name = [firstName, middleName, surname, suffix].filter(Boolean).join(' ');
      setFullName(name);
    }
  }, [portfolioData]);

  // Add scroll effect for section highlighting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const sections = document.querySelectorAll('[data-section]');
        let current = '';
        
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            current = section.getAttribute('data-section');
          }
        });
        
        setActiveSection(current);
      };

      // Add event listener
      window.addEventListener('scroll', handleScroll);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []); // Empty dependency array means this effect runs once on mount

  const handleProfileClick = () => {
    // You can implement profile click behavior here
    console.log('Profile clicked');
  };

  const handlePrevEducation = () => {
    setCurrentEducationIndex((prev) => 
      prev > 0 ? prev - 1 : prev
    );
  };

  const handleNextEducation = () => {
    setCurrentEducationIndex((prev) => 
      prev < educationLevels.length - 1 ? prev + 1 : prev
    );
  };

  // Get education data for current selection
  const getCurrentEducation = () => {
    const level = educationLevels[currentEducationIndex];
    const education = portfolioData?.education?.[currentEducationIndex];
    
    if (education) {
      return {
        level: level,
        school: education.school,
        degree: education.degree,
        field: education.field,
        startDate: education.startDate,
        endDate: education.endDate,
        location: education.location || (portfolioData.address ? 
          `${portfolioData.address.city || ''}, ${portfolioData.address.province || ''}, ${portfolioData.address.country || ''}`.replace(/^, |, $|, , /g, '') : 
          "Not specified")
      };
    }
    
    return {
      level: level,
      school: "Not specified",
      location: "Not specified",
    };
  };

  // Format projects data for display
  const projectsForDisplay = portfolioData?.projects?.map((project, idx) => ({
    id: idx + 1,
    imageSrc: project.image || "/gear.svg",
    projectName: project.name || `Project ${idx + 1}`,
    projectLink: project.link || "#",
  })) || [];

  // Format certificates for display
  const certificatesForDisplay = portfolioData?.certificates?.map((cert) => ({
    image: cert.image || "/gear.svg",
    title: cert.name || "Certificate",
    role: cert.issuer || "Recipient",
  })) || [];

  // Current education data
  const currentEducation = getCurrentEducation();
  
  // Handle the loading state
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <h2>Loading your portfolio...</h2>
      </div>
    );
  }

  // Handle the case when no data is available (null portfolioData)
  if (!portfolioData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Unable to load portfolio data</h2>
        <p>Please try again or create a new portfolio.</p>
        <button 
          className={styles.retryButton}
          onClick={() => {
            setIsLoading(true);
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isUsingMockData && (
        <div className={styles.mockDataLabel}>
          Using Mock Data
        </div>
      )}
      {/* LEFT SIDEBAR */}
      <div className={styles.profileinfo}>
        {/* Profile DIV */}
        <div className={styles.profilediv}>
          <div onClick={handleProfileClick} className={styles.profilecircle} title="View Profile">
            <img 
              src={portfolioData.profileImage || "/gear.svg"} 
              alt={`${fullName}'s profile`} 
            />
          </div>
          <div className={styles.profilename}>
            <h3 className={styles.profiletext}>{fullName}</h3>
          </div>
        </div>
        {/* CONTACT INFO DIV */}
        <div className={styles.infodiv} data-section="contact">
          <FaEnvelope size={24} style={{ marginRight: '10px' }} />
          <h1>Contact Info</h1>
        </div>
        <div className={styles.contactinfo}>
          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>
              <FaEnvelope size={20} style={{ marginRight: '10px' }} />
              Email
            </div>
            <div className={styles.contactmedialink}>
              {portfolioData.email ? (
                <a href={`mailto:${portfolioData.email}`} style={{ color: 'white', textDecoration: 'none' }}>
                  {portfolioData.email}
                </a>
              ) : (
                "Not specified"
              )}
            </div>
          </div>
          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>
              <FaPhone size={20} style={{ marginRight: '10px' }} />
              Phone
            </div>
            <div className={styles.contactmedialink}>
              {portfolioData.phone ? (
                <a href={`tel:${portfolioData.phone}`} style={{ color: 'white', textDecoration: 'none' }}>
                  {portfolioData.phone}
                </a>
              ) : (
                "Not specified"
              )}
            </div>
          </div>
          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>
              <FaMapMarkerAlt size={20} style={{ marginRight: '10px' }} />
              Location
            </div>
            <div className={styles.contactmedialink}>
              {portfolioData.address ? `${portfolioData.address.city}, ${portfolioData.address.province}, ${portfolioData.address.country}` : "Not specified"}
            </div>
          </div>
          {portfolioData.website && (
            <div className={styles.contactinfobox}>
              <div className={styles.contactmedia}>
                <FaExternalLinkAlt size={20} style={{ marginRight: '10px' }} />
                Website
              </div>
              <div className={styles.contactmedialink}>
                <a href={portfolioData.website} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                  {portfolioData.website}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* RIGHT MAIN CONTENT */}
      <div className={styles.porfoliodescription}>
        {/* EDUCATION SECTION */}
        <div className={styles.infodiv} data-section="education">
          <FaGraduationCap size={24} style={{ marginRight: '10px' }} />
          <h1>Education</h1>
        </div>
        <div className={styles.educationdiv}>
          <div className={styles.buttons1}>
            <div className={styles.button} onClick={handlePrevEducation}>
              <FaChevronLeft size={24} />
            </div>
          </div>
          <div className={styles.educationcontent}>
            <div className={styles.educationlevel}>
              {currentEducation.level}
            </div>
            <div className={styles.educational}>
              <div className={styles.firstbox}>
                {currentEducation.school}
              </div>
              <div className={styles.secondbox}>
                {currentEducation.field ? `${currentEducation.field} - ` : ''}
                {currentEducation.startDate ? new Date(currentEducation.startDate).getFullYear() : ''} 
                {currentEducation.endDate ? ` - ${new Date(currentEducation.endDate).getFullYear()}` : ''}
              </div>
            </div>
          </div>
          <div className={styles.buttons2}>
            <div className={styles.button} onClick={handleNextEducation}>
              <FaChevronRight size={24} />
            </div>
          </div>
        </div>
        {/* WORK EXPERIENCE SECTION */}
        <div className={styles.infodiv} data-section="experience">
          <FaBriefcase size={24} style={{ marginRight: '10px' }} />
          <h1>Work Experience</h1>
        </div>
        <div className={styles.experienceinfo}>
          {portfolioData.jobs && portfolioData.jobs.length > 0 ? (
            // Display job strings directly in simple boxes
            portfolioData.jobs.filter(job => job && job.trim()).map((job, index) => (
              <div key={`job-${index}`} className={styles.experiencebox}>
                {job}
              </div>
            ))
          ) : (
            // Fallback for no data
            <div className={styles.experiencebox}>
              <p>No work experience data available</p>
            </div>
          )}
        </div>
        
        {/* SKILLS SECTION */}
        <div className={styles.infodiv} data-section="skills">
          <FaTools size={24} style={{ marginRight: '10px' }} />
          <h1>Skills</h1>
        </div>
        <div className={styles.skillsinfo}>
          {portfolioData.skills?.map((skill, index) => (
            <span key={index} className={styles.skillbox}>{skill}</span>
          ))}
        </div>
        
        {/* CERTIFICATES SECTION */}
        <>
          <div className={styles.infodiv} data-section="certificates">
            <FaCertificate size={24} style={{ marginRight: '10px' }} />
            <h1>Certificates</h1>
          </div>
          <div className={styles.certdiv}>
            {portfolioData.certificates && portfolioData.certificates.length > 0 ? (
              portfolioData.certificates.map((cert, index) => {
                // Handle various property names that might exist in the data
                const certName = cert.name || cert.certificate_name || cert.title || "Certificate";
                const certIssuer = cert.issuer || cert.issuingOrganization || cert.organization || cert.issued_by || "Issuing Organization";
                const certDate = cert.date || cert.issueDate || cert.issued_date;
                // Use a default image with error handling
                const certImage = cert.image || cert.certificate_image || cert.imageUrl || '/gear.svg';
                
                console.log(`Certificate ${index} data:`, { name: certName, issuer: certIssuer, date: certDate, image: certImage });
                
                return (
                  <div key={index} className={styles.certificatebox}>
                    <div className={styles.certificateimagediv}>
                      <img 
                        src={certImage} 
                        alt={certName} 
                        className={styles.certImage}
                        onError={(e) => {
                          console.log(`Certificate image failed to load: ${certImage}`);
                          e.target.onerror = null;
                          e.target.src = '/gear.svg';
                        }}
                      />
                    </div>
                    <div className={styles.certificateinfodiv}>
                      <h3 className={styles.certificatetitle}>{certName}</h3>
                      <p className={styles.certificaterole}>{certIssuer}</p>
                      {certDate && (
                        <p>
                          {typeof certDate === 'string' 
                            ? certDate 
                            : new Date(certDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.certificatebox}>
                <div className={styles.certificateinfodiv}>
                  <h3 className={styles.certificatetitle}>No certificates available</h3>
                  <p className={styles.certificaterole}>Certificates will appear here when added</p>
                </div>
              </div>
            )}
          </div>
        </>
        
        {/* PROJECTS SECTION */}
        {portfolioData.projects && portfolioData.projects.length > 0 && (
          <>
            <div className={styles.infodiv} data-section="projects">
              <FaProjectDiagram size={24} style={{ marginRight: '10px' }} />
              <h1>Projects</h1>
            </div>
            <div className={styles.projectdiv}>
              {portfolioData.projects.map((project, index) => (
                <div key={index} className={styles.div1}>
                  <div className={styles.parentprojectdiv}>
                    <img 
                      src={project.image || '/gear.svg'} 
                      alt={project.name || "Project"} 
                      className={styles.projectImg}
                      onError={(e) => {
                        console.log("Project image failed to load:", project.image);
                        e.target.onerror = null;
                        e.target.src = '/gear.svg';
                      }}
                    />
                  </div>
                  <h3 className={styles.projectname}>{project.name}</h3>
                  <div className={styles.projectlink}>
                    <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
                      {project.link || "No link available"}
                      {project.link && <FaExternalLinkAlt size={14} style={{ marginLeft: '8px' }} />}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* Action Buttons */}
        <div className={styles.actionButtonsContainer}>
          <button 
            className={styles.editButton}
            onClick={() => {
              // Mark this as from creation so data isn't cleared
              sessionStorage.setItem('fromPortfolioCreation', 'true');
              // Make sure we don't clear localStorage data when editing
              sessionStorage.setItem('editingPortfolio', 'true');
              router.push('/portfolio_creation_page/1_name');
            }}
          >
            Edit Portfolio
          </button>
          <button 
            className={styles.generateButton}
            onClick={handleGeneratePortfolio}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Portfolio'}
          </button>
        </div>
        {showSuccessPopup && (
          <div className={styles.successPopup}>
            <p>Portfolio generated successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PortfolioPreviewPage;