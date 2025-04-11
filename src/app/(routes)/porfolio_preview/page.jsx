'use client';  // This tells Next.js that this is a client-side component
import styles from './porfoliopreview.module.css';
import React from 'react';


function PortfolioCreationPage() {
   const handleClick = () => {
    window.location.href = 'https://www.youtube.com/watch?v=UxTVemz_InI';
  };

  // OVERFLOWING PURPOSES FOR GRID CCONTAINERS
  const projectData = [
    { id: 1, imageSrc: "/wapanchman.jpg", projectName: "Project 1", projectLink: "https://example1.com" },
    { id: 2, imageSrc: "/wapanchman.jpg", projectName: "Project 2", projectLink: "https://example2.com" },
    { id: 3, imageSrc: "/wapanchman.jpg", projectName: "Project 3", projectLink: "https://example3.com" },
    { id: 4, imageSrc: "/wapanchman.jpg", projectName: "Project 4", projectLink: "https://example4.com" },
    { id: 5, imageSrc: "/wapanchman.jpg", projectName: "Project 5", projectLink: "https://example5.com" },
    { id: 6, imageSrc: "/wapanchman.jpg", projectName: "Project 6", projectLink: "https://example6.com" },
    { id: 7, imageSrc: "/wapanchman.jpg", projectName: "Project 7", projectLink: "https://example7.com" },
    { id: 8, imageSrc: "/wapanchman.jpg", projectName: "Project 8", projectLink: "https://example8.com" },
    { id: 9, imageSrc: "/wapanchman.jpg", projectName: "Project 9", projectLink: "https://example9.com" },
    { id: 10, imageSrc: "/wapanchman.jpg", projectName: "Project 10", projectLink: "https://example10.com" }
  ];
  const certificates = [
    { image: "/wapanchman.jpg", title: "Aiga Design Conference", role: "Guest Speaker" },
    { image: "/wapanchman.jpg", title: "UX Cebu Summit", role: "Panelist" },
    { image: "/wapanchman.jpg", title: "Frontend Fiesta 2024", role: "Keynote Speaker" },
    { image: "/wapanchman.jpg", title: "Design Matters PH", role: "Workshop Facilitator" },
    { image: "/wapanchman.jpg", title: "Web Innovators Meetup", role: "Awardee" },
    { image: "/wapanchman.jpg", title: "DevCon Pilipinas", role: "Speaker" },
    { image: "/wapanchman.jpg", title: "CIT-U Tech Symposium", role: "Alumni Guest" },
    { image: "/wapanchman.jpg", title: "Figma Community Day", role: "Host" },
    { image: "/wapanchman.jpg", title: "Visayas Design Camp", role: "Mentor" },
    { image: "/wapanchman.jpg", title: "Pinoy Dev Talks", role: "Speaker" }
  ];
  
  return (
    <div className={styles.container}>

      <div className={styles.profileinfo}>

        {/* Profile DIV */}
        <div className={styles.profilediv}>
          <div onClick={handleClick} className={styles.profilecircle} >
            <img src="/wapanchman.jpg" alt="Certificate Image" />
          </div>
          <div className={styles.profilename}>
            <h3 className={styles.profiletext}>Andrea Brillantes</h3>
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
            <div className={styles.contactmedialink}>email.address@gmail.com</div>
          </div>

          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>Phone</div>
            <div className={styles.contactmedialink}>+639XX-XXX-XXXX</div>
          </div>

          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>LinkedIn</div>
            <div className={styles.contactmedialink}>linkedin.com/AndreaBrillantes</div>
          </div>
        </div>
        {/* END OF CONTACT INFO DIV */}

        {/* ADDRESS INFO DIV */}
        <div className={styles.infodiv}>
          <h1>Address</h1>
        </div>
        <div className={styles.addressinfo}>
          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>Country</div>
            <div className={styles.contactmedialink}>Philippines</div>
          </div>

          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>Province</div>
            <div className={styles.contactmedialink}>Cebu</div>
          </div>
          
          <div className={styles.contactinfobox}>
            <div className={styles.contactmedia}>City/Municipality</div>
            <div className={styles.contactmedialink}>Minglanilla</div>
          </div>
        </div>
        {/* END OF ADDRESS INFO DIV */}


        {/* WORK INFO TEXT DIV */}
        <div className={styles.infodiv}>
          <h1>Work Experience</h1>
        </div>
        <div className={styles.workinfo}>
          <div className={styles.workinfobox}>
            <h2>• Senior UI/UX Designer</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Senior Web Developer</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Trainer for UI/UX Designing</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Junior Back-end Developer</h2>
          </div>
        </div>
        {/* END WORK INFO DIV */}

        {/* SKILLS INFO DIV */}
        <div className={styles.infodiv}>
          <h1>Skills</h1>
        </div>
        <div className={styles.skillsinfo}>
          <div className={styles.workinfobox}>
            <h2>• HTML</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• CSS</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• JavaScript</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Python</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Scrum and Agile Methodologies</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Copywriting</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Problem-Solving</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Creative Thinking</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Software Development</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• User Interfaces</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Computer Hardware Engineering</h2>
          </div>
          <div className={styles.workinfobox}>
            <h2>• Project Management</h2>
          </div>
        </div>
        {/* END OF SKILLS INFO  DIV */}

      </div>

      <div className={styles.porfoliodescription}>
        {/* DESCRIPTION DIV */}
        <div className={styles.descriptiondiv}>
          <h3> I’m a UI/UX Designer working in Cebu, Philippines</h3>
          <h3> Brief Description Here </h3>
        </div>
        {/* END OF DESCRIPTION DIV */}

        {/* EDUCATION DIV */}
        <div className={styles.biginfodiv}>
          <h1>Education</h1>
        </div>

        <div className={styles.educationdiv}>
          <div className={styles.buttons1}> 
            <div className={styles.button}>
              &lt;
            </div>
          </div>

          <div className={styles.educationcontent}>
            <div className={styles.educationlevel}>
              Elementary
            </div>
            
            <div className={styles.educational}>
              <div className={styles.firstbox}>
                <h1> De La Salle Andres Soriano Memorial College</h1>
              </div>
              <div className={styles.secondbox}>
                <h1> Toledo, Cebu, Philippines</h1>
              </div>
            </div>
          </div>

          <div className={styles.buttons2}>
            <div className={styles.button}>
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
        {projectData.map((project) => (
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
        {certificates.map((cert, index) => (
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

export default PortfolioCreationPage;