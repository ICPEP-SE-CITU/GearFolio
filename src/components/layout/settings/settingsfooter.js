// src/components/layout/settings/settingsfooter.js
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// CHANGED: Import from the new light-themed CSS module
import styles from '../../../styles/settingsfooter.module.css';

const SettingsFooter = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const brandImages = [
    {
      src: "/image/logo.svg",
      alt: "GearFolio Logo"
    },
    {
      src: "/image/phoebeFront.jpg",
      alt: "Phoebe Character"
    },
    {
      src: "/image/assitBot.png",
      alt: "Super Book Illustration"
    }
  ];

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % brandImages.length);
  };

  return (
    // The root className now solely comes from the new CSS module
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brandColumn}>
          <div
            className={styles.logoWrapper}
            onClick={handleImageClick}
            title="Click to change image"
          >
            <div className={styles.logoContainer}>
              <Image
                src={brandImages[currentImageIndex].src}
                alt={brandImages[currentImageIndex].alt}
                width={60}
                height={60}
                className={styles.logo} // This class should be defined in your CSS module
                priority
              />
            </div>
            <span className={styles.brandName}>GearFolio</span>
          </div>
          <p className={styles.tagline}>
            Elevate your portfolio with AI-powered tools and professional templates.
          </p>
          <div className={styles.socialLinks}>
            <Link href="#" aria-label="Twitter">
              <span className={styles.socialIcon}>𝕏</span>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <span className={styles.socialIcon}>in</span>
            </Link>
            <Link href="#" aria-label="Instagram">
              <span className={styles.socialIcon}>📷</span>
            </Link>
            <Link href="#" aria-label="GitHub">
              <span className={styles.socialIcon}>💻</span>
            </Link>
          </div>
        </div>

        <div className={styles.linksContainer}>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linkList}>
              {/* Apply Tailwind for link colors directly here for simplicity,
                  or define these in settingsfooter.module.css under .linkList li a */ }
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
              <li><Link href="/press" className="text-gray-600 hover:text-blue-600">Press</Link></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Resources</h3>
            <ul className={styles.linkList}>
              <li><Link href="/help" className="text-gray-600 hover:text-blue-600">Help & Support</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
              <li><Link href="/templates" className="text-gray-600 hover:text-blue-600">Templates</Link></li>
              <li><Link href="/examples" className="text-gray-600 hover:text-blue-600">Examples</Link></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-600 hover:text-blue-600">Cookie Policy</Link></li>
              <li><Link href="/gdpr" className="text-gray-600 hover:text-blue-600">GDPR</Link></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <ul className={styles.linkList}>
              {/* Text color for these li elements will be inherited from .footer or .linkList
                  as defined in settingsfooter.module.css */}
              <li>icpepseofficial256@gmail.com</li>
              <li>+63 123 1234 123</li>
              <li>123 Mervin St.</li>
              <li>Cebu, Philippines</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} GearFolio. All rights reserved.
        </div>
        <div className={styles.legalLinks}>
          <Link href="/accessibility" className="text-gray-500 hover:text-blue-600">Accessibility</Link>
          <span className={styles.divider}>|</span>
          <Link href="/sitemap" className="text-gray-500 hover:text-blue-600">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default SettingsFooter;