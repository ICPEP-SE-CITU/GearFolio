import styles from './porfoliopreview.module.css';

function PortfolioCreationPage() {
  return (
    <div className={styles.container}>

      <div className={styles.profileinfo}>

        {/* Profile DIV */}
        <div className={styles.profilediv}>

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

      </div>

    </div>
  );
}

export default PortfolioCreationPage;