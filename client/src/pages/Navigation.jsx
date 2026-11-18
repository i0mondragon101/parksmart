import { useLocation, useNavigate } from 'react-router-dom';

function NavigationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination, parkingOption } = location.state || {};

  const recentRoute = {
    parkingLocation: 'Lot 1 - Main Street',
    destination: 'Plumas Hall',
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const hoursDiff = (now - date) / (1000 * 60 * 60);

    if (hoursDiff < 1) {
      const minutes = Math.floor(hoursDiff * 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hoursDiff < 24) {
      const hours = Math.floor(hoursDiff);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="page">
      <h1>Navigation</h1>
      <p>Get driving and walking directions to your parking destination.</p>

      <div className="recent-route-section">
        <h2>Your Most Recent Route</h2>
        <div className="recent-route-card">
          <div className="route-details">
            <p><strong>Parking Location:</strong> {recentRoute.parkingLocation}</p>
            <p><strong>Destination:</strong> {recentRoute.destination}</p>
            <p><strong>Last Used:</strong> {formatTimestamp(recentRoute.lastUsed)}</p>
          </div>
          <button
            onClick={() => navigate('/navigation', {
              state: { destination: recentRoute.destination, parkingOption: { name: recentRoute.parkingLocation } }
            })}
            className="btn-primary"
          >
            Get Directions Again
          </button>
        </div>
      </div>

      {parkingOption && destination ? (
        <div className="current-navigation">
          <h2>Current Navigation</h2>
          <div className="navigation-details">
            <p><strong>From:</strong> Your current location</p>
            <p><strong>To:</strong> {parkingOption.name}</p>
            <p><strong>Final Destination:</strong> {destination}</p>
          </div>

          <div className="directions-section">
            <h3>Driving Directions</h3>
            <div className="directions-placeholder">
              <p>Driving directions will be displayed here</p>
              <p className="directions-note">Map integration coming soon</p>
            </div>

            <h3>Walking Directions</h3>
            <div className="directions-placeholder">
              <p>Walking directions from {parkingOption.name} to {destination}</p>
              <p className="directions-note">Walking time: {parkingOption.walkingTime || '5 min'}</p>
            </div>
          </div>

          <div className="navigation-actions">
            <button
              onClick={() => navigate('/conditions', { state: { destination, parkingOption } })}
              className="btn-secondary"
            >
              Back to Conditions
            </button>
            <button
              onClick={() => navigate('/report-condition', { state: { parkingOption } })}
              className="btn-secondary"
            >
              Report Condition
            </button>
          </div>
        </div>
      ) : (
        <div className="no-navigation">
          <p>No current navigation selected.</p>
          <button onClick={() => navigate('/parking-options')} className="btn-primary">
            Select Parking Location
          </button>
        </div>
      )}
    </div>
  );
}

export default NavigationPage;
