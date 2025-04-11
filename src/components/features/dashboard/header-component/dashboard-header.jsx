import React from 'react';
import Link from 'next/link'; 
import styles from './dashboard-header.module.css'; 

function DashboardHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <img src="https://placehold.co/78x78" alt="GearFolio Logo" className={styles.logoImage} />
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/dashboard"
            className={styles.homeLink}
          >
            <div className={styles.homeLinkInner}>
              Home
            </div>
          </Link>
          <Link href="/portfolio" className={styles.otherLink}>
            My Portfolio
          </Link>
          <Link href="/recommendations" className={styles.otherLink}>
            AI recommendations
          </Link>
          <Link href="/settings" className={styles.otherLink}>
            Settings
          </Link>
        </nav>
      </div>
      <div className={styles.profileContainer}>
        <img src="https://placehold.co/60x60" alt="User Profile" className={styles.profileImage} style={{ width: '60px', height: '60px' }} />
      </div>
    </header>
  );
}

export default DashboardHeader;