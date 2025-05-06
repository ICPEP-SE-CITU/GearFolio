 -"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './dashboard-header.module.css';
import { getProfileImageByName } from '../../../../utils/appwriteProfile';

function DashboardHeader() {
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const imageUrl = await getProfileImageByName("DINAMPO.jpg");
        if (imageUrl) {
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error("Failed to load profile image", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileImage();
  }, []);

  /*
  // USE THIS CODE FOR GETTING PROFILE IMAGE BY USER ID

   const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        // You'd typically get this from auth context or state
        const userId = "current-user-id";

        const imageUrl = await getProfileImageUrl(userId);
        if (imageUrl) {
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error("Failed to load profile image", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileImage();
  }, []);
   */

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
        {isLoading ? (
            <div className={styles.profileImageLoader}></div>
        ) : (
            <img
                src={profileImage || "https://placehold.co/60x60"}
                alt="User Profile"
                className={styles.profileImage}
                style={{ width: '60px', height: '60px' }}
            />
        )}
      </div>
    </header>
  );
}

export default DashboardHeader;