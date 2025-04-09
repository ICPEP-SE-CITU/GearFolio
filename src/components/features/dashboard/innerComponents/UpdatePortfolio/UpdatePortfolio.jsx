// components/UpdatePortfolio.jsx
import React from 'react';

const UpdatePortfolio = () => {
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
    <div data-layer="update" style={containerStyle}>
      <div
        data-layer="Update Portfolio."
        style={{
          left: 44, top: 69, position: 'absolute', textAlign: 'center',
          justifyContent: 'center', display: 'flex', flexDirection: 'column',
          color: 'black', fontSize: 32, fontFamily: 'Geist', fontWeight: '600', wordWrap: 'break-word'
        }}
      >
        Update Portfolio.
      </div>
      <div
        data-layer="Apply AI recommendations and improve your portfolio."
        style={{
          width: 425, left: 19, top: 131, position: 'absolute',
          justifyContent: 'center', display: 'flex', flexDirection: 'column',
          color: '#858585', fontSize: 18, fontFamily: 'Geist', fontWeight: '400', wordWrap: 'break-word'
        }}
      >
        Apply AI recommendations and improve your portfolio.
      </div>
    </div>
  );
};

export default UpdatePortfolio;