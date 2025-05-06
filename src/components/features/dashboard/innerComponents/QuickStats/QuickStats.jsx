import React, { useState, useEffect } from 'react';
import { getStats } from '../../../../../utils/appwriteDashboard';

const QuickStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsData = await getStats();
                console.log("Fetched stats data:", statsData); // Log to see what data comes back

                if (statsData && statsData.length > 0) {
                    // Transform the data into a more usable format
                    const formattedStats = {};
                    statsData.forEach(stat => {
                        formattedStats[stat.name] = parseInt(stat.percentage);
                    });

                    console.log("Formatted stats:", formattedStats); // Log formatted data
                    setStats(formattedStats);
                } else {
                    console.warn("No stats data returned from Appwrite");
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching stats:", err);
                setError("Failed to load statistics");
                setLoading(false);
            }
        };

        fetchStats();
    }, []);



  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    outline: '1px solid #D9D9D9',
    outlineOffset: '-1px',
  };

  // Function to create clip path for partial circular fill
  const getClipPath = (percentage) => {
    if (percentage >= 100) return '';

    // Calculate angle based on percentage
    const angle = (percentage / 100) * 360;

    // For angles less than 180 degrees
    if (angle <= 180) {
      return `polygon(50% 0%, 50% 50%, ${50 + 50 * Math.sin(angle * Math.PI / 180)}% ${50 - 50 * Math.cos(angle * Math.PI / 180)}%, 0% 0%)`;
    }
    // For angles greater than 180 degrees
    else {
      return `polygon(50% 0%, 50% 50%, 100% 50%, 100% 0%, 50% 0%, 50% 50%, ${50 + 50 * Math.sin(angle * Math.PI / 180)}% ${50 - 50 * Math.cos(angle * Math.PI / 180)}%)`;
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>
      </div>
    );
  }

  // Use real data or fallback to defaults
  const aiCompletion = stats?.aiCompletion || 20;
  const taskCompletion = stats?.taskCompletion || 50;

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

      {/* AI Completion Chart */}
      <div
        data-layer="AI Completion"
        data-property-1="Variant3"
        style={{ width: 240, height: 240, left: 706, top: 15, position: 'absolute' }}
      >
        <div
          data-layer="percentage"
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
          <div
            data-layer="Ellipse 36"
            style={{
              width: 235,
              height: 235,
              left: 3,
              top: 3,
              position: 'absolute',
              background: '#4AA3E6',
              borderRadius: '9999px',
              clipPath: getClipPath(aiCompletion),
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
            data-layer="Completion Text"
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
            {aiCompletion}% Completed
          </div>
        </div>
      </div>

      {/* Task Completion Chart */}
      <div
        data-layer="Task Completion"
        data-property-1="Variant6"
        style={{ width: 240, height: 240, left: 434, top: 15, position: 'absolute' }}
      >
        <div
          data-layer="percentage"
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
          <div
            data-layer="Ellipse 36"
            style={{
              width: 235,
              height: 235,
              left: 3,
              top: 3,
              position: 'absolute',
              background: '#153D65',
              borderRadius: '9999px',
              clipPath: getClipPath(taskCompletion),
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
            data-layer="Completion Text"
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
            <>{taskCompletion}%<br />Completed</>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;