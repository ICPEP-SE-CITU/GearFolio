'use client';  // This tells Next.js that this is a client-side component
import styles from './porfoliopreview.module.css';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPortfolioById, getLatestPortfolio } from '@/lib/api/portfolio';
import Image from 'next/image';

function PortfolioPreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [currentEducationIndex, setCurrentEducationIndex] = useState(0);

  // Education levels in order
  const educationLevels = ["Elementary", "Junior High", "Senior High", "Undergraduate", "Masters", "Doctoral"];
  
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        
        // Try to get portfolio ID from URL query params
        const portfolioId = searchParams.get('id');
        let portfolio;
        
        if (portfolioId) {
          // If we have an ID, fetch that specific portfolio
          portfolio = await getPortfolioById(portfolioId);
        } else {
          // Otherwise get the latest one (for demo purposes)
          portfolio = await getLatestPortfolio();
        }
        
        setPortfolioData(portfolio);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setError('Failed to load portfolio data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [searchParams]);

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

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  // Show error state
  if (error || !portfolioData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error || 'Could not load portfolio data'}</p>
        <button 
          className={styles.retryButton}
          onClick={() => router.refresh()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Get education data for current selection
  const getCurrentEducation = () => {
    const level = educationLevels[currentEducationIndex];
    
    if (level === "Elementary" && portfolioData.elementary) {
      return {
        level: "Elementary",
        school: portfolioData.elementary,
        location: `${portfolioData.city || ''}, ${portfolioData.province || ''}, ${portfolioData.country || ''}`,
      };
    } else if (level === "Junior High" && portfolioData.juniorHigh) {
      return {
        level: "Junior High",
        school: portfolioData.juniorHigh,
        location: `${portfolioData.city || ''}, ${portfolioData.province || ''}, ${portfolioData.country || ''}`,
      };
    } else if (level === "Senior High" && portfolioData.seniorHigh) {
      return {
        level: "Senior High",
        school: portfolioData.seniorHigh,
        location: `${portfolioData.city || ''}, ${portfolioData.province || ''}, ${portfolioData.country || ''}`,
      };
    } else {
      // Check degreeLevel if available
      if (portfolioData.degreeLevel && portfolioData.degreeLevel.includes(level.toLowerCase())) {
        const universityMatch = portfolioData.degreeLevel.match(new RegExp(`${level.toLowerCase()}: (.*?)(?:,|$)`));
        return {
          level: level,
          school: universityMatch ? universityMatch[1] : "University",
          location: `${portfolioData.city || ''}, ${portfolioData.province || ''}, ${portfolioData.country || ''}`,
        };
      }
    }
    
    return {
      level: level,
      school: "Not specified",
      location: "Not specified",
    };
  };

  // Format projects data for display
  const projectsForDisplay = portfolioData.projectsProcessed && portfolioData.projectsProcessed.length > 0 
    ? portfolioData.projectsProcessed.map((project, idx) => ({
        id: idx + 1,
        imageSrc: project.logoUrl || "/wapanchman.jpg", // Fallback image
        projectName: project.name || `Project ${idx + 1}`,
        projectLink: project.link || "#",
      }))
    : Array(10).fill(0).map((_, idx) => ({
        id: idx + 1,
        imageSrc: "/wapanchman.jpg",
        projectName: `Project ${idx + 1}`,
        projectLink: `https://example${idx + 1}.com`,
      }));

  // Format certificates for display
  const certificatesForDisplay = portfolioData.certificatesProcessed && portfolioData.certificatesProcessed.length > 0
    ? portfolioData.certificatesProcessed.map((cert) => ({
        image: cert.imageUrl || "/wapanchman.jpg", // Fallback image
        title: cert.description || "Certificate",
        role: "Recipient",
      }))
    : Array(10).fill(0).map((_, idx) => ({
        image: "/wapanchman.jpg",
        title: `Certificate ${idx + 1}`,
        role: ["Guest Speaker", "Panelist", "Attendee", "Awardee", "Participant"][idx % 5],
      }));

  // Get user's full name
  const fullName = [
    portfolioData.firstName || "",
    portfolioData.middleName || "",
    portfolioData.lastName || "",
    portfolioData.suffix || ""
  ].filter(Boolean).join(" ");

  // Current education data
  const currentEducation = getCurrentEducation();
  
  return (
    <div className={styles.container}>

      <div className={styles.profileinfo}>

        {/* Profile DIV */}
        <div className={styles.profilediv}>
          <div onClick={handleProfileClick} className={styles.profilecircle} >
            <img 
              src={portfolioData.userImageUrl || "/wapanchman.jpg"} 
              alt={`${fullName}'s profile`} 
            />
          </div>
          <div className={styles.profilename}>
            <h3 className={styles.profiletext}>{fullName}</h3>
          </div>
          <div>

          </div>
        </div>
        {/* END of Profile DIV */}

        {/* CONTACT INFO  DIV */}
        <div className={styles.infodiv}>
          <h1>Contact Info</h1>
        </div>
        
        <div className={styles.contactinfo}>
          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>Email</div>
            <div className={styles.contactmedialink}>{portfolioData.email || "Not specified"}</div>
          </div>

          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>Phone</div>
            <div className={styles.contactmedialink}>{portfolioData.contactNumber || "Not specified"}</div>
          </div>

          {portfolioData.socialsArray && portfolioData.socialsArray.length > 0 ? (
            portfolioData.socialsArray.map((social, index) => (
              <div key={index} className={styles.contactinfobox}>
                <div className={styles.contactmedia}>{social.platform || "Social Media"}</div>
                <div className={styles.contactmedialink}>{social.url || "Not specified"}</div>
              </div>
            ))
          ) : (
            <div className={styles.contactinfobox}>
              <div className={styles.contactmedia}>LinkedIn</div>
              <div className={styles.contactmedialink}>Not specified</div>
            </div>
          )}
        </div>
        {/* END OF CONTACT INFO DIV */}

        {/* ADDRESS INFO DIV */}
        <div className={styles.infodiv}>
          <h1>Address</h1>
        </div>
        <div className={styles.addressinfo}>
          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>Country</div>
            <div className={styles.contactmedialink}>{portfolioData.country || "Not specified"}</div>
          </div>

          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>Province</div>
            <div className={styles.contactmedialink}>{portfolioData.province || "Not specified"}</div>
          </div>
          
          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>City/Municipality</div>
            <div className={styles.contactmedialink}>{portfolioData.city || "Not specified"}</div>
          </div>
        </div>
        {/* END OF ADDRESS INFO DIV */}


        {/* WORK INFO TEXT DIV */}
        <div className={styles.infodiv}>
          <h1>Work Experience</h1>
        </div>
        <div className={styles.workinfo}>
          {portfolioData.jobsArray && portfolioData.jobsArray.length > 0 ? (
            portfolioData.jobsArray.map((job, index) => (
              <div key={index} className={styles.workinfobox}>
                <h2>• {job}</h2>
              </div>
            ))
          ) : (
            <div className={styles.workinfobox}>
              <h2>• No work experience listed</h2>
            </div>
          )}
        </div>
        {/* END WORK INFO DIV */}

        {/* SKILLS INFO DIV */}
        <div className={styles.infodiv}>
          <h1>Skills</h1>
        </div>
        <div className={styles.skillsinfo}>
          {portfolioData.skillsArray && portfolioData.skillsArray.length > 0 ? (
            portfolioData.skillsArray.map((skill, index) => (
              <div key={index} className={styles.workinfobox}>
                <h2>• {skill}</h2>
              </div>
            ))
          ) : (
            <div className={styles.workinfobox}>
              <h2>• No skills listed</h2>
            </div>
          )}
        </div>
        {/* END OF SKILLS INFO  DIV */}

      </div>

      <div className={styles.porfoliodescription}>
        {/* DESCRIPTION DIV */}
        <div className={styles.descriptiondiv}>
          <h3>{`${portfolioData.firstName || ''} is a professional in ${portfolioData.city || ''}, ${portfolioData.country || ''}`}</h3>
          <h3>{portfolioData.jobsArray && portfolioData.jobsArray.length > 0 ? portfolioData.jobsArray[0] : "Professional"}</h3>
        </div>
        {/* END OF DESCRIPTION DIV */}

        {/* EDUCATION DIV */}
        <div className={styles.biginfodiv}>
          <h1>Education</h1>
        </div>

        <div className={styles.educationdiv}>
          <div className={styles.buttons1}> 
            <div className={styles.button} onClick={handlePrevEducation}>
              &lt;
            </div>
          </div>

          <div className={styles.educationcontent}>
            <div className={styles.educationlevel}>
              {currentEducation.level}
            </div>
            
            <div className={styles.educational}>
              <div className={styles.firstbox}>
                <h1>{currentEducation.school}</h1>
              </div>
              <div className={styles.secondbox}>
                <h1>{currentEducation.location}</h1>
              </div>
            </div>
          </div>

          <div className={styles.buttons2}>
            <div className={styles.button} onClick={handleNextEducation}>
              &gt;
            </div>
          </div>
        </div>
        {/* END OF Education DIV */}

        {/* PROJECT DIV */}
        <div className={styles.biginfodiv}>
          <h1>Projects</h1>
        </div>

        <div className={styles.projectdiv}>
          {projectsForDisplay.map((project) => (
            <div key={project.id} className={styles.div1}>
              <div className={styles.parentprojectdiv}>
                <div className={styles.projectimage}>
                  <img src={project.imageSrc} alt={project.projectName} />
                </div>
              </div>

              <div className={styles.projectname}>
                {project.projectName}
              </div>

              <div className={styles.projectlink}>
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                  {project.projectLink}
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* END OF PROJECT DIV */}

        {/* CERTIFICATE DIV */}
        <div className={styles.biginfodiv}>
          <h1>Certificates</h1>
        </div>

        <div className={styles.certdiv}>
          {certificatesForDisplay.map((cert, index) => (
            <div className={styles.certificatebox} key={index}>
              <div className={styles.certificateimagediv}>
                <div className={styles.certimagecontainer}>
                  <img src={cert.image} alt={`Certificate ${index + 1}`} />
                </div>
              </div>

              <div className={styles.certificateinfodiv}>
                <div className={styles.certificatetitle}>{cert.title}</div>
                <div className={styles.certificaterole}>{cert.role}</div>
              </div>
            </div>
          ))}

          <div style={{ height: "50px", flexShrink: 0 }} />
        </div>
        {/* END OF CERTIFICATE DIV */}
      </div>

    </div>
  );
}

export default PortfolioPreviewPage;