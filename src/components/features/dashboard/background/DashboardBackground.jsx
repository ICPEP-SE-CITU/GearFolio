// components/features/dashboard/background/DashboardBackground.jsx
import React from 'react';
import styles from './DashboardBackground.module.css'; // Import the CSS module

function DashboardBackground({ children }) {
  return (
    <div className={styles.background}>
      {children}
    </div>
  );
}

export default DashboardBackground;