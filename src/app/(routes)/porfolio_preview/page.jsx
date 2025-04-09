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

          </div>
          <div>

          </div>
        </div>
        {/* END of Profile DIV */}

        {/* CONTACT INFO  DIV */}
        <div className={styles.infodiv}>

        </div>
        
        <div className={styles.contactinfo}>

        </div>
        {/* END OF CONTACT INFO DIV */}

        {/* ADDRESS INFO DIV */}
        <div className={styles.infodiv}>

        </div>
        <div className={styles.addressinfo}>

        </div>
        {/* END OF ADDRESS INFO DIV */}


        {/* WORK INFO TEXT DIV */}
        <div className={styles.infodiv}>

        </div>
        <div className={styles.workinfo}>

        </div>
        {/* END WORK INFO DIV */}

        {/* SKILLS INFO DIV */}
        <div className={styles.infodiv}>

        </div>
        <div className={styles.skillsinfo}>

        </div>
        {/* END OF SKILLS INFO  DIV */}

      </div>




      <div className={styles.porfoliodescription}>
        {/* DESCRIPTION DIV */}
        <div className={styles.descriptiondiv}>

        </div>
        {/* END OF DESCRIPTION DIV */}

        {/* EDUCATION DIV */}
        <div className={styles.biginfodiv}>

        </div>

        <div className={styles.educationdiv}>

        </div>
        {/* END OF Education DIV */}

        {/* PROJECT DIV */}
        <div className={styles.biginfodiv}>

        </div>

        <div className={styles.projectdiv}>

        </div>
        {/* END OF PROJECT DIV */}

        {/* CERTIFICATE DIV */}
        <div className={styles.biginfodiv}>

        </div>
        <div className={styles.certdiv}>

        </div>
        {/* END OF CERTIFICATE DIV */}
      </div>

    </div>
  );
}

export default PortfolioCreationPage;