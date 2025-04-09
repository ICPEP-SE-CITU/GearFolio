import React from 'react';
import Link from 'next/link'; // For navigation within Next.js
import styles from '../styles-components/dashboard-header.module.css'; // Import the CSS Module

function DashboardHeader() {
  return (
    <header className={styles.header}>
      {/* Left Section: Logo and Navigation */}
      <div className={styles.leftSection}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <img src="https://placehold.co/78x78" alt="GearFolio Logo" className={styles.logoImage} />
            {/* Optional: Add text logo */}
            {/* <span className="ml-2 text-xl font-semibold">GearFolio</span> */}
          </Link>
        </div>

        {/* Navigation Links */}
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

      {/* Far Right: User Profile */}
      <div className={styles.profileContainer}>
        <img src="https://placehold.co/60x60" alt="User Profile" className={styles.profileImage} style={{ width: '60px', height: '60px' }} />
      </div>
    </header>
  );
}

export default DashboardHeader;