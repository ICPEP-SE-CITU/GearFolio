// components/QuickStats.jsx
import React from 'react';

// Note: The circular progress charts are represented statically here using divs.
// In a real app, you'd likely use a charting library or SVG manipulation for dynamic progress.

const QuickStats = () => {
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
    <div data-layer="Quick Stats" style={containerStyle}>
      <div
        data-layer="View your progress and completeness with percentages."
        style={{
          width: 364,
          height: 46,
          left: 15,
          top: 133,
          position: 'absolute',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#858585',
          fontSize: 18,
          fontFamily: 'Geist',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        View your progress and completeness with percentages.
      </div>
      <div
        data-layer="Quick Stats"
        style={{
          width: 180,
          left: 107,
          top: 91,
          position: 'absolute',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: 'black',
          fontSize: 32,
          fontFamily: 'Geist',
          fontWeight: '600',
          wordWrap: 'break-word',
        }}
      >
        Quick Stats
      </div>

      {/* 20% Chart */}
      <div
        data-layer="0% AI"
        data-property-1="Variant3"
        style={{ width: 240, height: 240, left: 706, top: 15, position: 'absolute' }}
      >
        <div
          data-layer="20%"
          style={{ width: 240, height: 240, left: 0, top: 0, position: 'absolute', overflow: 'hidden' }}
        >
          <div
            data-layer="Ellipse 38"
            style={{
              width: 240,
              height: 240,
              left: 0,
              top: 0,
              position: 'absolute',
              background: '#D5E6EF',
              borderRadius: '9999px',
              border: '1px black solid',
            }}
          />
          {/* This div likely represents the filled portion of the chart */}
          <div
            data-layer="Ellipse 36"
            style={{
              width: 235,
              height: 235,
              left: 3,
              top: 3,
              position: 'absolute',
              background: 'var(--Color-Primary-Primary---500, #4AA3E6)', // Placeholder color if variable not defined
              borderRadius: '9999px',
              // Clip-path or masking would typically be used here for partial fill
            }}
          />
          <div
            data-layer="Ellipse 37"
            style={{
              width: 215,
              height: 215,
              left: 13,
              top: 13,
              position: 'absolute',
              background: 'white',
              borderRadius: '9999px',
              border: '1px black solid',
            }}
          />
          <div
            data-layer="20% Completed"
            style={{
              width: 133,
              height: 70,
              left: 53,
              top: 85,
              position: 'absolute',
              textAlign: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              color: 'black',
              fontSize: 18,
              fontFamily: 'Geist',
              fontWeight: '600',
              wordWrap: 'break-word',
            }}
          >
            20% Completed
          </div>
        </div>
      </div>

      {/* 50% Chart */}
      <div
        data-layer="0% comp"
        data-property-1="Variant6"
        style={{ width: 240, height: 240, left: 434, top: 15, position: 'absolute' }}
      >
        <div
          data-layer="50%"
          style={{ width: 240, height: 240, left: 0, top: 0, position: 'absolute', overflow: 'hidden' }}
        >
          <div
            data-layer="Ellipse 38"
            style={{
              width: 240,
              height: 240,
              left: 0,
              top: 0,
              position: 'absolute',
              background: 'rgba(213, 230, 239, 0.84)',
              borderRadius: '9999px',
              border: '1px black solid',
            }}
          />
          {/* This div likely represents the filled portion of the chart */}
          <div
            data-layer="Ellipse 36"
            style={{
              width: 235,
              height: 235,
              left: 3,
              top: 3,
              position: 'absolute',
              background: 'var(--Color-Primary-Primary---900, #153D65)', // Placeholder color if variable not defined
              borderRadius: '9999px',
               // Clip-path or masking would typically be used here for partial fill
            }}
          />
          <div
            data-layer="Ellipse 37"
            style={{
              width: 215,
              height: 215,
              left: 13,
              top: 13,
              position: 'absolute',
              background: 'white',
              borderRadius: '9999px',
              border: '1px black solid',
            }}
          />
          <div
            data-layer="50% Completed"
            style={{
              width: 133,
              height: 70,
              left: 53,
              top: 85,
              position: 'absolute',
              textAlign: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              color: 'black',
              fontSize: 18,
              fontFamily: 'Geist',
              fontWeight: '600',
              wordWrap: 'break-word',
            }}
          >
            {/* Using fragment for line break */}
            <>50%<br />Completed</>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;