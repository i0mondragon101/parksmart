import { useLocation, useNavigate } from 'react-router-dom';

function ParkingConditions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination, parkingOption } = location.state || {};

  const isOutdated = (timestamp) => {
    const reportTime = new Date(timestamp);
    const now = new Date();
    const hoursDiff = (now - reportTime) / (1000 * 60 * 60);
    return hoursDiff > 24;
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
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const recentReports = [
    {
      id: 1,
      condition: 'Open',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      reporter: 'Student A'
    },
    {
      id: 2,
      condition: 'Open',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      reporter: 'Student B'
    },
    {
      id: 3,
      condition: 'Nearly Full',
      timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
      reporter: 'Student C'
    }
  ];

  if (!parkingOption) {
    return (
      <div className="page">
        <h1>Parking Conditions</h1>
        <p>Please select a parking location first.</p>
        <button onClick={() => navigate('/parking-options')} className="btn-primary">
          View Parking Options
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Parking Conditions</h1>
      <p>Destination: <strong>{destination}</strong></p>
      <p>Location: <strong>{parkingOption.name}</strong></p>

      <div className="conditions-section">
        <h2>Current Status</h2>
        <div className="status-card">
          <p>
            <strong>Availability:</strong>{' '}
            <span className={`availability ${parkingOption.availability.toLowerCase().replace(' ', '-')}`}>
              {parkingOption.availability}
            </span>
          </p>
          <p><strong>Permit Requirement:</strong> {parkingOption.permit}</p>
          <p><strong>Cost:</strong> {parkingOption.cost}</p>
          <p><strong>Distance from Destination:</strong> {parkingOption.distance}</p>
          <p><strong>Walking Time:</strong> {parkingOption.walkingTime}</p>
        </div>
      </div>

      <div className="reports-section">
        <h2>Recent Reports</h2>
        <div className="reports-list">
          {recentReports.map((report) => {
            const outdated = isOutdated(report.timestamp);
            return (
              <div key={report.id} className={`report-card ${outdated ? 'outdated' : ''}`}>
                <div className="report-header">
                  <span className={`availability ${report.condition.toLowerCase().replace(' ', '-')}`}>
                    {report.condition}
                  </span>
                  {outdated && <span className="outdated-badge">Outdated</span>}
                </div>
                <p><strong>Reported by:</strong> {report.reporter}</p>
                <p><strong>Time:</strong> {formatTimestamp(report.timestamp)}</p>
              </div>
            );
          })}
        </div>
        <p className="outdated-note">
          Reports older than 24 hours are marked as outdated and may not reflect current conditions.
        </p>
      </div>

      <div className="action-buttons">
        <button
          onClick={() => navigate('/navigation', { state: { destination, parkingOption } })}
          className="btn-primary"
        >
          Get Directions
        </button>
        <button
          onClick={() => navigate('/report-condition', { state: { parkingOption } })}
          className="btn-secondary"
        >
          Report Condition
        </button>
      </div>
    </div>
  );
}

export default ParkingConditions;
