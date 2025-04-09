// components/SuggestionsReminders.jsx
import React from 'react';

// Note: Icons are placeholders. Replace with actual icons (SVG, library).
// Add Circle Icon Placeholder
const AddCircleIcon = () => (
  <div data-layer="add_circle" style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden' }}>
    {/* This inner div likely represents the icon graphic */}
    <div data-layer="icon" style={{ width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: 'var(--Schemes-On-Surface, #1D1B20)' }} />
  </div>
);

// Edit Icon Placeholder
const EditIcon = () => (
   <div data-layer="Edit" data-size="48" style={{ width: 27, height: 24, position: 'relative', overflow: 'hidden' }}>
      {/* This inner div likely represents the icon graphic */}
      <div data-layer="Icon" style={{ width: '22.64px', height: '20.12px', left: '2.25px', top: '1.88px', position: 'absolute', outline: '4px solid var(--Icon-Default-Default, #1E1E1E)', outlineOffset: '-2px' }} />
  </div>
);

// Placeholder for the rotated image icon - replace src and alt
const RotatedIcon = () => (
    <img
      data-layer="image 28"
      style={{
        width: '23.97px',
        height: '30px',
        position: 'absolute',
        transform: 'rotate(180deg)',
        transformOrigin: 'top left',
        // Remove positioning from here if positioning the wrapper
      }}
      src="https://placehold.co/24x30" // Replace with actual icon path
      alt="Suggestion icon" // Descriptive alt text
    />
);


const SuggestionsReminders = () => {
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    outline: '1px solid #D9D9D9',
    outlineOffset: '-1px',
  };

  return (
    <div data-layer="Suggestion and Reminders" style={containerStyle}>
      <div
        data-layer="Suggestions and Reminders"
        style={{
          left: 27, top: 16, position: 'absolute', textAlign: 'center',
          justifyContent: 'center', display: 'flex', flexDirection: 'column',
          color: 'black', fontSize: 32, fontFamily: 'Geist', fontWeight: '600', wordWrap: 'break-word'
        }}
      >
        Suggestions and Reminders
      </div>
      <div
        data-layer="Revisit your uncompleted sections, and review AI feedback."
        style={{
          width: 425, left: 31, top: 64, position: 'absolute',
          justifyContent: 'center', display: 'flex', flexDirection: 'column',
          color: '#858585', fontSize: 18, fontFamily: 'Geist', fontWeight: '400', wordWrap: 'break-word'
        }}
      >
        Revisit your uncompleted sections, and review AI feedback.
      </div>

      {/* Suggestion Items */}
      <div style={{ position: 'absolute', top: 143, left: 31, display: 'flex', alignItems: 'center' }}>
          <AddCircleIcon />
          <div data-layer="Add More Projects" style={{ marginLeft: 4, color: '#858585', fontSize: 18, fontFamily: 'Geist', fontWeight: '400' }}>
            Add More Projects
          </div>
      </div>
      <div data-layer="Rectangle 26" style={{ width: 630, height: 12, left: 274, top: 149, position: 'absolute', background: 'var(--Color-Primary-Primary---900, #153D65)', borderRadius: 5 }} />

      <div style={{ position: 'absolute', top: 196, left: 31, display: 'flex', alignItems: 'center' }}>
         {/* Placeholder for the icon shown near "Apply AI Suggestions" */}
         {/* Assuming the rotated icon belongs here based on visual layout */}
         <div style={{width: 24, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}> {/* Wrapper to align */}
             <RotatedIcon />
         </div>
         <div data-layer="Apply AI Suggestions" style={{ marginLeft: 4, color: '#858585', fontSize: 18, fontFamily: 'Geist', fontWeight: '400' }}>
             Apply AI Suggestions
         </div>
      </div>
      <div data-layer="Rectangle 27" style={{ width: 398, height: 12, left: 274, top: 200, position: 'absolute', background: 'var(--Color-Primary-Primary---600, #156AB4)', borderRadius: 5 }} />

      <div style={{ position: 'absolute', top: 250, left: 31, display: 'flex', alignItems: 'center' }}> {/* Adjusted top slightly for alignment */}
          <EditIcon />
           <div data-layer="Revise text formatting and wordings" style={{ marginLeft: 4, color: '#858585', fontSize: 18, fontFamily: 'Geist', fontWeight: '400' }}>
            Revise text formatting <br />and wordings
           </div>
      </div>
      <div data-layer="Rectangle 28" style={{ width: 214, height: 12, left: 274, top: 253, position: 'absolute', background: 'var(--Color-Primary-Primary---300, #C0DDF7)', borderRadius: 5 }} />

    </div>
  );
};

export default SuggestionsReminders;