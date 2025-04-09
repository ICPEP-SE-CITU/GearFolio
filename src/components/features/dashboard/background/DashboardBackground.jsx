
import React from 'react';

function DashboardBackground({ children }) {
  return (
    <div style={{ backgroundColor: '#f7f7ff', minHeight: '100vh', width: '100%', zIndex: -1 }}>
      {children}
    </div>
  );
}

export default DashboardBackground;