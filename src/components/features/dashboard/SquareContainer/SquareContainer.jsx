// components/features/dashboard/SquareContainer.jsx
import React from 'react';
import styles from './SquareContainer.module.css';
import PortfolioViews from "@/components/features/dashboard/innerComponents/PortfolioViews/PortfolioViews.jsx";
import QuickStats from "@/components/features/dashboard/innerComponents/QuickStats/QuickStats.jsx";
import StartNewProject from "@/components/features/dashboard/innerComponents/StartNewProject/StartNewProject.jsx";
import SuggestionsReminders from "@/components/features/dashboard/innerComponents/SuggestionsReminders/SuggestionsReminders.jsx";
import UpdatePortfolio from "@/components/features/dashboard/innerComponents/UpdatePortfolio/UpdatePortfolio.jsx";
import CompletePortfolio from "@/components/features/dashboard/innerComponents/CompletePortfolio/CompletePortfolio.jsx"; // Import the CompletePortfolio component

function SquareContainer({ children, className, style }) {
  return (
    <div className={`${styles.aspectRatioContainer} ${className}`} style={style}>
      <div className={styles.aspectRatioInner} style={style}> {/* Removed inline backgroundColor */}
        {children}
        {/*grid*/}
        {/*this will be column 1*/}
        <PortfolioViews /> {/* Render the PortfolioViews component here */}
        <StartNewProject /> {/* Render the QuickStats component here */}
        <QuickStats />
        {/*this will be column 1*/}

        {/*this will be column 2*/}
        <CompletePortfolio /> {/* Render the CompletePortfolio component here */}
        <SuggestionsReminders /> {/* Render the StartNewProject component here*/}
        <UpdatePortfolio /> {/* Render the UpdatePortfolio component here*/}
        {/*this will be column 2*/}
      </div>
    </div>
  );
}

export default SquareContainer;
