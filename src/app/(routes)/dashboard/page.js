"use client";

import React from 'react';
import DashboardHeader from "@/components/features/dashboard/header-component/dashboard-header.jsx";
import SearchBar from "@/components/features/dashboard/searchbr-component/searchbr-component.jsx";
import DashboardBackground from "@/components/features/dashboard/background/DashboardBackground.jsx"; 
import SquareContainer from "@/components/features/dashboard/SquareContainer/SquareContainer.jsx";
import SquareBoxes from "@/components/features/dashboard/SquareBoxes/SquareBoxes.jsx"; 
import Footer from "@/components/features/dashboard/Footer/Footer.jsx"; // Import the Footer component

function Dashboard() {
  return (
    <DashboardBackground>
      <DashboardHeader />
      <SearchBar /> 
      <main className="p-6 md:p-10 lg:p-16">
        <SquareContainer />
        <div data-layer="Component 3" className="Component3" style={{maxWidth: '90%', maxWidth: 1604, margin: '7rem auto',position: 'relative',}}>
          <div data-layer="Rectangle 58" className="Rectangle58" 
          style={{          
              width: '100%',
              height: 81,
              position: 'absolute',
              background: 'white',
              borderRadius: 30,
              border: '1px black solid',}} 
              />
          <div data-layer="Projects" className="Projects" style={{width: 218, left: 65, top: 10, position: 'absolute', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>Projects</div>
        </div>
        <SquareBoxes /> 
        <h1>Welcome to your Dashboard</h1>
        <p>This is the main content area.</p>
      </main>

      <Footer />  {/* Footer is correctly placed outside <main> */}
    </DashboardBackground>
  );
}

export default Dashboard;