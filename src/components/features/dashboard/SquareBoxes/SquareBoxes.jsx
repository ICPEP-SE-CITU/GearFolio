// SquareBoxes.jsx
import React from 'react';
import styles from './SquareBoxes.module.css';

const SquareBoxes = () => {
  const boxes = [
    {
      title: 'VanHoltz Co.',
      url: 'http://vanholtz.co',
      logoText: 'VAN HOLTZ CO.', // Placeholder for the logo
    },
    {
      title: 'Global Goals Curriculum',
      url: 'http://ggc2030.org/en/home',
      logoText: 'GCC 2030', // Placeholder for the logo
    },
    {
      title: 'DesignLab',
      url: 'http://designlab.com',
      logoText: 'DesignLab', // Placeholder for the logo
    },
  ];

  return (
    <div className={styles.container}>
      {boxes.map((box, index) => (
        <div key={index} className={styles.box}>
          <div className={styles.logo}>{box.logoText}</div>
          <div className={styles.textContainer}>
            <span className={styles.title}>{box.title}</span>
            <span className={styles.url}>{box.url}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SquareBoxes;