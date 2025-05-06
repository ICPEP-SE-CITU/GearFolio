import React from 'react';
import styles from './Footer.module.css'; // Use CSS Modules import syntax

const Footer = () => {
  return (
    <footer className={styles.BlueFooter}>
      <div className={styles.LogoContainer}>
        <img
          className={styles.Gearfolio}
          src="https://placehold.co/268x268"
          alt="Gearfolio"
        />
      </div>
      <div className={styles.SocialSection}>
        <h3 className={styles.Social}>Social</h3>
        <div className={styles.SocialLinks}>
          <a href="#" className={styles.Facebook}>Facebook</a>
          <a href="#" className={styles.Instagram}>Instagram</a>
          <a href="#" className={styles.Tiktok}>Tiktok</a>
          <a href="#" className={styles.Youtube}>Youtube</a>
        </div>
      </div>
      <div className={styles.LinksSection}>
        <a href="#" className={styles.About}>About</a>
        <a href="#" className={styles.Faq}>FAQ</a>
        <a href="#" className={styles.PrivacyPolicy}>Privacy Policy</a>
        <a href="#" className={styles.TermsOfService}>Terms of Service</a>
        <a href="#" className={styles.HelpSupport}>Help & Support</a>
      </div>
    </footer>
  );
};

export default Footer;