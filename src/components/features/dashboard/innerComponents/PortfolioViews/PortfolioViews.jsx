// components/PortfolioViews.jsx
import React from 'react';

const PortfolioViews = () => {
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    outline: '1px solid #D9D9D9', // Corrected syntax
    outlineOffset: '-1px',
  };

  const textStyle = {
    left: '36px',
    top: '36px',
    position: 'absolute',
    color: 'black',
    fontSize: '30px',
    fontFamily: 'Inter',
    fontWeight: '600',
    wordWrap: 'break-word',
  };

  return (
    <div data-layer="Frame 53" style={containerStyle}>
      <div data-layer="Portfolio Views:" style={textStyle}>
        Portfolio Views:
      </div>
    </div>
  );
};

export default PortfolioViews;