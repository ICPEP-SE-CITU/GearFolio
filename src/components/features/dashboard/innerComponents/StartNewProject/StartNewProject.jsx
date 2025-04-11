// components/StartNewProject.jsx
import React from 'react';

// Note: Placeholder for Plus icon. Replace with actual icon (SVG, library).
// Consider using <button> for the clickable div.
const PlusIcon = () => (
    <div data-layer="Plus" data-size="48" style={{ width: 48, height: 48, position: 'relative', overflow: 'hidden' }}>
        {/* This inner div likely represents the icon graphic */}
        <div data-layer="Icon" style={{ width: 28, height: 28, left: 10, top: 10, position: 'absolute', outline: '4px solid var(--Icon-Default-Default, #1E1E1E)', outlineOffset: '-2px' }} />
    </div>
);

const StartNewProject = () => {
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
      width: 195, height: 48, left: 124, top: 179, position: 'absolute',
      background: 'var(--Color-Primary-Primary---600, #156AB4)',
      borderRadius: 25,
      display: 'flex', // Added for centering text
      alignItems: 'center', // Added for centering text
      justifyContent: 'center', // Added for centering text
      cursor: 'pointer' // Added for button feel
  };

  const buttonTextStyle = {
     // width: 164, left: 140, top: 172, position: 'absolute', // Positioning handled by flexbox in parent
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
      fontFamily: 'Geist',
      fontWeight: '600',
      wordWrap: 'break-word',
  };


  return (
    <div data-layer="Add-proj" style={containerStyle}>
        <div style={{ position: 'absolute', left: 198, top: 37 }}> {/* Wrapper for Icon */}
            <PlusIcon />
        </div>
      <div
        data-layer="Start a new project." // Updated text based on snippet
        style={{
          left: 72, top: 85, position: 'absolute', textAlign: 'center',
          justifyContent: 'center', display: 'flex', flexDirection: 'column',
          color: 'black', fontSize: 32, fontFamily: 'Geist', fontWeight: '600', wordWrap: 'break-word'
        }}
      >
        Start a new project.
      </div>
       {/* Clickable Div (consider using <button>) */}
      <div data-layer="Frame 6" style={buttonStyle} role="button" tabIndex={0} /* onClick={...} */>
        <div data-layer="Click here" style={buttonTextStyle}>
          Click here
        </div>
      </div>
    </div>
  );
};

export default StartNewProject;