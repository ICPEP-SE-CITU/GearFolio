// pages/dashboard.js
"use client";

import React from 'react';
import DashboardHeader from "@/components/features/dashboard/header-component/dashboard-header.jsx";
import SearchBar from "@/components/features/dashboard/searchbr-component/searchbr-component.jsx";
import DashboardBackground from "@/components/features/dashboard/background/DashboardBackground.jsx";

// --- Import the dashboard section components ---
import QuickStats from '@/components/features/dashboard/innerComponents/QuickStats/QuickStats.jsx'; // Adjust path if necessary
import SuggestionsReminders from '@/components/features/dashboard/innerComponents/SuggestionsReminders/SuggestionsReminders.jsx'; // Adjust path if necessary
import CompletePortfolio from '@/components/features/dashboard/innerComponents/CompletePortfolio/CompletePortfolio.jsx'; // Adjust path if necessary
import StartNewProject from '@/components/features/dashboard/innerComponents/StartNewProject/StartNewProject.jsx'; // Adjust path if necessary
import UpdatePortfolio from '@/components/features/dashboard/innerComponents/UpdatePortfolio/UpdatePortfolio.jsx'; // Adjust path if necessary
// --- Remove the old SquareContainer import ---
// import SquareContainer from "@/components/features/dashboard/SquareContainer/SquareContainer.jsx";

function Dashboard() {

  // --- Define the Grid Container Style ---
  // This style will be applied to a wrapper div inside the <main> tag
  const gridContainerStyle = {
    display: 'grid',
    // Define 2 columns: Left column takes 2 parts, Right column takes 1 part
    gridTemplateColumns: '2fr 1fr',
    gap: '20px', // Adjust the gap between grid items as needed
    width: '100%', // Ensure the grid takes full width of its container (main)
  };

  // --- Optional: Styles for columns if needed (e.g., for stacking items) ---
  const leftColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Space between items in the left column
  };

  const rightColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Space between items in the right column
  };

  return (
    <DashboardBackground>
      <DashboardHeader />
      <SearchBar />
      {/* Main content area now uses the grid layout */}
      {/* The padding from the original main tag is kept */}
      <main className="p-6 md:p-10 lg:p-16">

        {/* --- Apply the grid container style here --- */}
        <div style={gridContainerStyle}>

          {/* --- Left Column Content --- */}
          {/* Use a wrapper div for the left column items */}
          <div style={leftColumnStyle}>
             {/* PortfolioViews could potentially go here if needed, or above QuickStats */}
            <QuickStats />
            <SuggestionsReminders />
            {/* Add other left-column components if any */}
          </div>

          {/* --- Right Column Content --- */}
          {/* Use a wrapper div for the right column items */}
          <div style={rightColumnStyle}>
            <CompletePortfolio />
            <StartNewProject />
            <UpdatePortfolio />
            {/* Add other right-column components if any */}
          </div>

        </div>
        {/* Removed SquareContainer and placeholder h1/p */}
      </main>
    </DashboardBackground>
  );
}

export default Dashboard;