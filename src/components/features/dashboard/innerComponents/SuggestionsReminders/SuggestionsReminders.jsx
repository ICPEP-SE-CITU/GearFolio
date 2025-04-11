import React from 'react';

// Placeholder Icons (standardized sizes)
const AddCircleIcon = () => (
  <div data-layer="add_circle" style={{ width: '1.5rem', height: '1.5rem', position: 'relative', overflow: 'hidden' }}>
    <div data-layer="icon" style={{ width: '1.25rem', height: '1.25rem', left: '0.125rem', top: '0.125rem', position: 'absolute', background: 'var(--Schemes-On-Surface, #1D1B20)' }} />
  </div>
);

const EditIcon = () => (
  <div data-layer="Edit" data-size="48" style={{ width: '1.5rem', height: '1.5rem', position: 'relative', overflow: 'hidden' }}>
    <div data-layer="Icon" style={{ width: '1.25rem', height: '1.25rem', left: '0.125rem', top: '0.125rem', position: 'absolute', outline: '4px solid var(--Icon-Default-Default, #1E1E1E)', outlineOffset: '-2px' }} />
  </div>
);

const RotatedIcon = () => (
  <img
    data-layer="image 28"
    style={{
      width: '1.5rem',
      height: '1.5rem',
      position: 'absolute',
      transform: 'rotate(180deg)',
      transformOrigin: 'center',
    }}
    src="https://placehold.co/24x24"
    alt="Suggestion icon"
  />
);

const SuggestionsReminders = () => {
  // Base container style
  const containerStyle = {
    width: '100%',
    minWidth: '320px',
    height: 'auto',
    position: 'relative',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    outline: '1px solid #D9D9D9',
    outlineOffset: '-1px',
    padding: '1rem',
    boxSizing: 'border-box',
  };

  // Responsive font sizes and positioning
  const titleStyle = {
    position: 'absolute',
    left: '1.5rem',
    top: '1rem',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: 'black',
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontFamily: 'Geist',
    fontWeight: '600',
    wordWrap: 'break-word',
  };

  const subtitleStyle = {
    width: '90%',
    maxWidth: '425px',
    left: '1.5rem',
    top: '4rem',
    position: 'absolute',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: '#858585',
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    fontFamily: 'Geist',
    fontWeight: '400',
    wordWrap: 'break-word',
    lineHeight: '1.2', // Ensure proper line spacing for wrapping
  };

  // Consistent wrapper for icons
  const iconWrapperStyle = {
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Responsive suggestion items
  const suggestionItemStyle = {
    position: 'absolute',
    left: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 3rem)', // Ensure it fits within the container
  };

  const suggestionTextStyle = {
    marginLeft: '0.5rem',
    color: '#858585',
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    fontFamily: 'Geist',
    fontWeight: '400',
    wordWrap: 'break-word',
    lineHeight: '1.2', // Ensure proper line spacing
  };

  // Dynamic progress bar style
  const progressBarStyle = (percentage) => ({
    width: `calc(${percentage}% - 5rem)`, // Adjusted for mobile
    minWidth: '100px',
    height: '0.75rem',
    position: 'absolute',
    left: '5rem', // Start closer to the suggestion text
    borderRadius: '5px',
  });

  return (
    <div data-layer="Suggestion and Reminders" style={containerStyle}>
      {/* Title */}
      <div data-layer="Suggestions and Reminders" style={titleStyle}>
        Suggestions and Reminders
      </div>

      {/* Subtitle */}
      <div
        data-layer="Revisit your uncompleted sections, and review AI feedback."
        style={subtitleStyle}
      >
        Revisit your uncompleted sections, and review AI feedback.
      </div>

      {/* Suggestion Items */}
      <div style={{ ...suggestionItemStyle, top: '7rem' }}>
        <div style={iconWrapperStyle}>
          <AddCircleIcon />
        </div>
        <div data-layer="Add More Projects" style={suggestionTextStyle}>
          Add More Projects
        </div>
      </div>
      <div
        data-layer="Rectangle 26"
        style={{
          ...progressBarStyle(80),
          top: '8rem',
          background: 'var(--Color-Primary-Primary---900, #153D65)',
        }}
      />

      <div style={{ ...suggestionItemStyle, top: '10rem' }}>
        <div style={iconWrapperStyle}>
          <RotatedIcon />
        </div>
        <div data-layer="Apply AI Suggestions" style={suggestionTextStyle}>
          Apply AI Suggestions
        </div>
      </div>
      <div
        data-layer="Rectangle 27"
        style={{
          ...progressBarStyle(50),
          top: '11rem',
          background: 'var(--Color-Primary-Primary---600, #156AB4)',
        }}
      />

      <div style={{ ...suggestionItemStyle, top: '13rem' }}>
        <div style={iconWrapperStyle}>
          <EditIcon />
        </div>
        <div data-layer="Revise text formatting and wordings" style={suggestionTextStyle}>
          Revise text formatting and wordings
        </div>
      </div>
      <div
        data-layer="Rectangle 28"
        style={{
          ...progressBarStyle(30),
          top: '15rem',
          background: 'var(--Color-Primary-Primary---300, #C0DDF7)',
        }}
      />

      {/* Inline Media Queries */}
      <style>
        {`
          @media (max-width: 768px) {
            [data-layer="Suggestions and Reminders"] {
              font-size: 1.25rem !important;
              left: 1rem !important;
              top: 0.5rem !important;
            }
            [data-layer="Revisit your uncompleted sections, and review AI feedback."] {
              font-size: 0.875rem !important;
              left: 1rem !important;
              top: 2.5rem !important;
              width: 90% !important;
              max-width: none !important; /* Allow full width for wrapping */
            }
            [data-layer="Suggestion and Reminders"] > div {
              top: calc(5rem + 1rem) !important; /* Adjust for smaller screens */
            }
            [data-layer="Rectangle 26"],
            [data-layer="Rectangle 27"],
            [data-layer="Rectangle 28"] {
              left: 5rem !important;
              width: calc(60% - 5rem) !important;
              min-width: 100px !important;
            }
          }

          @media (max-width: 480px) {
            [data-layer="Suggestions and Reminders"] {
              font-size: 1rem !important;
            }
            [data-layer="Revisit your uncompleted sections, and review AI feedback."] {
              font-size: 0.75rem !important;
              top: 2rem !important;
            }
            [data-layer="Add More Projects"],
            [data-layer="Apply AI Suggestions"],
            [data-layer="Revise text formatting and wordings"] {
              font-size: 0.75rem !important;
            }
            /* Adjust suggestion items and progress bars for mobile */
            [data-layer="Suggestion and Reminders"] > div:nth-child(3) { /* Add More Projects */
              top: 5rem !important;
            }
            [data-layer="Rectangle 26"] {
              top: 6rem !important;
            }
            [data-layer="Suggestion and Reminders"] > div:nth-child(5) { /* Apply AI Suggestions */
              top: 8rem !important;
            }
            [data-layer="Rectangle 27"] {
              top: 9rem !important;
            }
            [data-layer="Suggestion and Reminders"] > div:nth-child(7) { /* Revise text formatting */
              top: 11rem !important;
            }
            [data-layer="Rectangle 28"] {
              top: 13rem !important;
            }
            [data-layer="Rectangle 26"],
            [data-layer="Rectangle 27"],
            [data-layer="Rectangle 28"] {
              left: 4rem !important;
              width: calc(60% - 4rem) !important;
              min-width: 80px !important;
            }
          }

          @media (min-width: 1024px) {
            [data-layer="Rectangle 26"],
            [data-layer="Rectangle 27"],
            [data-layer="Rectangle 28"] {
              left: 16rem !important;
              width: calc(80% - 16rem) !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SuggestionsReminders;