// pages/dashboard.js
"use client";

import React from 'react';
import DashboardHeader from "@/components/features/dashboard/header-component/dashboard-header.jsx";
import SearchBar from "@/components/features/dashboard/searchbr-component/searchbr-component.jsx"; // Import the SearchBar component
import DashboardBackground from "@/components/features/dashboard/background/DashboardBackground.jsx"; // Import the new component
import SquareContainer from "@/components/features/dashboard/SquareContainer/SquareContainer.jsx"; // Import the new component

function Dashboard() {
  return (
    /* Render the SearchBar component here */
    <DashboardBackground>
      <DashboardHeader />
      <SearchBar /> 
      {/* Main content area below the header */}
      <main className="p-6 md:p-10 lg:p-16">
        <SquareContainer />
        {/* Your main dashboard content will go here */}
        <h1>Welcome to your Dashboard</h1>
        <p>This is the main content area.</p>
      </main>
      </DashboardBackground>
  );
}

export default Dashboard;