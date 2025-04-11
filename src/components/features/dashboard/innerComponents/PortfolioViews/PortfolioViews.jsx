import React from 'react';

const PortfolioViews = () => {
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    outline: '1px solid #D9D9D9',
    outlineOffset: '-1px',
    padding: '2%', // Add padding to prevent content from touching edges
    boxSizing: 'border-box', // Include padding in width and height calculations
  };

  const textStyle = {
    position: 'absolute',
    left: '2%', // Relative left position
    top: '5%', // Relative top position
    fontSize: '30px',
    color: 'black',
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