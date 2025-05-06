import Image from 'next/image';
import styles from '../../styles/landing-page/nextLevel.module.css';

const NextLevel = () => {
  const portfolioExamples = [
    {
      src: "/image/imageNL1.png",
      alt: "Professional portfolio example 1",
      id: 1,
    },
    {
      src: "/image/imageNL2.png",
      alt: "Professional portfolio example 2",
      id: 2,
    },
    {
      src: "/image/imageNL3.png",
      alt: "Professional portfolio example 3",
      id: 3,
    },
  ];

  return (
    <section className={styles.section}>
      {/* Animated background elements */}
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      <div className={styles.circle3}></div>
      
      <div className={styles.container}>
        <h2 className={styles.title}>
          Ready to Take Your Portfolio to the <span className={styles.underline}>Next Level</span>?
        </h2>

        <div className={styles.portfolioExamples}>
          {portfolioExamples.map((example) => (
            <div key={example.id} className={styles.exampleContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src={example.src}
                  alt={example.alt}
                  width={400}
                  height={300}
                  className={styles.portfolioImage}
                  priority
                />
                <div className={styles.imageHoverEffect}></div>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.ctaButton}>
          Get Started Now
          <span className={styles.arrow}>→</span>
          <span className={styles.buttonParticles}></span>
        </button>
      </div>
    </section>
  );
};

export default NextLevel;
