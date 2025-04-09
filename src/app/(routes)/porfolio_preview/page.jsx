'use client';  // This tells Next.js that this is a client-side component
import styles from './porfoliopreview.module.css';
import React from 'react';


function PortfolioCreationPage() {
   // Function to handle the click event
   const handleClick = () => {
    // Redirect to the YouTube video by changing the window location
    window.location.href = 'https://www.youtube.com/watch?v=UxTVemz_InI';
  };
  
  return (
    <div className={styles.container}>

      <div className={styles.profileinfo}>

        {/* Profile DIV */}
        <div className={styles.profilediv}>
          <div onClick={handleClick} className={styles.profilecircle} >

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

        </div>
        {/* END OF CONTACT INFO DIV */}

        {/* ADDRESS INFO DIV */}
        <div className={styles.infodiv}>
          <h1>Address</h1>
        </div>
        <div className={styles.addressinfo}>

        </div>
        {/* END OF ADDRESS INFO DIV */}


        {/* WORK INFO TEXT DIV */}
        <div className={styles.infodiv}>
          <h1>Work Experience</h1>
        </div>
        <div className={styles.workinfo}>

        </div>
        {/* END WORK INFO DIV */}

        {/* SKILLS INFO DIV */}
        <div className={styles.infodiv}>
          <h1>Skills</h1>
        </div>
        <div className={styles.skillsinfo}>

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
        <div className={styles.div1}>
          <div>
            
          </div>
        </div>
        <div className={styles.div2}></div>
        <div className={styles.div3}></div>
        <div className={styles.div4}></div>
        <div className={styles.div5}></div>
        <div className={styles.div6}></div>
        <div className={styles.div7}></div>
        <div className={styles.div8}></div>
        <div className={styles.div9}></div>
        <div className={styles.div10}></div>
        <div className={styles.div11}></div>
        <div className={styles.div12}></div>
        <div className={styles.div13}></div>
        <div className={styles.div14}></div>
        <div className={styles.div15}></div>
        <div className={styles.div16}></div>
        <div className={styles.div17}></div>
        <div className={styles.div18}></div>
        <div className={styles.div19}></div>
        <div className={styles.div20}></div>
        </div>
        {/* END OF PROJECT DIV */}

        {/* CERTIFICATE DIV */}
        <div className={styles.biginfodiv}>
          <h1>Certificates</h1>
        </div>
        <div className={styles.certdiv}>

        </div>
        {/* END OF CERTIFICATE DIV */}
      </div>

    </div>
  );
}

export default PortfolioCreationPage;