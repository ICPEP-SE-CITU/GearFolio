// src/components/layout/Footer.js
"use client"; // Make sure this is at the top if you're using useState

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; // Assuming this is your dark purple footer that uses state
import styles from '../../styles/footer.module.css'; // Assuming this is the CSS for the dark purple footer

const Footer = () => {
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
    // Add id="global-footer" here
    <footer id="global-footer" className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo and Brand Info */}
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
                width={60} // Ensure these dimensions are appropriate
                height={60}
                className={styles.logo}
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

        {/* Navigation Links */}
        <div className={styles.linksContainer}>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linkList}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/press">Press</Link></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Resources</h3>
            <ul className={styles.linkList}>
              <li><Link href="/help-support">Help & Support</Link></li>
              <li><Link href="/templates">Templates</Link></li>
              <li><Link href="/examples">Examples</Link></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
              <li><Link href="/gdpr">GDPR</Link></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <ul className={styles.linkList}>
              <li>icpepseofficial256@gmail.com</li>
              <li>+63 123 1234 123</li>
              <li>123 Mervin St.</li>
              <li>Cebu, Philippines</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright and Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} GearFolio. All rights reserved.
        </div>
        <div className={styles.legalLinks}>
          <Link href="/accessibility">Accessibility</Link>
          <span className={styles.divider}>|</span>
          <Link href="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;