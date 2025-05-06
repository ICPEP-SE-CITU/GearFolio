import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/landing-page/portfolioAssistant.module.css';

const PortfolioAssistant = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/image/assitBot.png",
      alt: "Friendly AI assistant"
    },
    {
      src: "/image/phoebeFront.jpg",
      alt: "Phoebe character"
    },
    {
      src: "/image/superBook.png",
      alt: "Super book illustration"
    }
  ];

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className={styles.section}>
      {/* Floating tech elements */}
      <div className={styles.techCircle}></div>
      <div className={styles.techSquare}></div>
      <div className={styles.techTriangle}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <span className={styles.highlight}>AI-Powered</span> Portfolio Assistance
            </h1>
            <p className={styles.description}>
              Creating a compelling portfolio can be challenging, but GearFolio makes it effortless with 
              AI-driven suggestions and automation. From structuring your content to refining your 
              achievements, our platform ensures your portfolio showcases your skills and experience 
              in the best possible way.
            </p>
            <div className={styles.sparkleContainer}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.sparkle}></div>
              ))}
            </div>
          </div>
          <div className={styles.visualContent}>
            <div className={styles.bubbleContainer}>
              <div className={styles.bubble1}></div>
              <div className={styles.bubble2}></div>
              <div className={styles.bubble3}></div>
              <div 
                className={styles.clickableImageContainer}
                onClick={handleImageClick}
                title="Click to change image"
              >
                <Image
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  width={500}
                  height={500}
                  className={styles.mainImage}
                  priority
                />
                <div className={styles.glow}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioAssistant;
