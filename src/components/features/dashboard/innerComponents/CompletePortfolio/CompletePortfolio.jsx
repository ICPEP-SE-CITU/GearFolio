// components/CompletePortfolio.jsx
import React from 'react';

// Note: Replace placeholder icon src and alt. Consider using <button> for the clickable div.
const CompletePortfolio = () => {
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    outline: '1px solid #D9D9D9',
    outlineOffset: '-1px',
  };

  // Style for the div acting as a button
  const buttonStyle = {
      width: 195, height: 48, left: 125, top: 200, position: 'absolute',
      background: 'var(--Color-Primary-Primary---600, #156AB4)',
      borderRadius: 25,
      display: 'flex', // Added for centering text
      alignItems: 'center', // Added for centering text
      justifyContent: 'center', // Added for centering text
      cursor: 'pointer' // Added for button feel
  };

  const buttonTextStyle = {
     // width: 164, left: 141, top: 185, position: 'absolute', // Positioning handled by flexbox in parent
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
      fontFamily: 'Geist',
      fontWeight: '600',
      wordWrap: 'break-word',
  };


  return (
    <div data-layer="Complete-port" style={containerStyle}>
       <img
        data-layer="note 1"
        style={{ width: '40.40px', height: '48px', left: '203px', top: '34px', position: 'absolute' }}
        src="https://placehold.co/40x48" // Replace src
        alt="Portfolio icon" // Replace alt
      />
      <div
        data-layer="Complete your portfolio."
        style={{
          left: 37, top: 98, position: 'absolute', textAlign: 'center',
          justifyContent: 'center', display: 'flex', flexDirection: 'column',
          color: 'black', fontSize: 32, fontFamily: 'Geist', fontWeight: '600', wordWrap: 'break-word'
        }}
      >
        Complete your portfolio.
      </div>
      {/* Clickable Div (consider using <button>) */}
      <div data-layer="Frame 7" style={buttonStyle} role="button" tabIndex={0} /* onClick={...} */ >
        <div data-layer="Click here" style={buttonTextStyle}>
          Click here
        </div>
      </div>
    </div>
  );
};

export default CompletePortfolio;