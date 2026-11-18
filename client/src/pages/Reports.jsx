function Reports() {
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

  const isOutdated = (timestamp) => {
    const reportTime = new Date(timestamp);
    const now = new Date();
    const hoursDiff = (now - reportTime) / (1000 * 60 * 60);
    return hoursDiff > 24;
  };

  const allReports = [
    {
      id: 1,
      location: 'Lot 1 - Main Street',
      condition: 'Open',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      reporter: 'Student A'
    },
    {
      id: 2,
      location: 'Lot 2 - Second Street',
      condition: 'Nearly Full',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      reporter: 'Student B'
    },
    {
      id: 3,
      location: 'Lot 3 - West Campus',
      condition: 'Open',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      reporter: 'Student C'
    },
    {
      id: 4,
      location: 'Structure A - North',
      condition: 'Full',
      timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      reporter: 'Student D'
    },
    {
      id: 5,
      location: 'Lot 1 - Main Street',
      condition: 'Nearly Full',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      reporter: 'Student E'
    }
  ];

  return (
    <div className="page">
      <h1>Parking Reports</h1>
      <p>View recent user reports for parking conditions across all locations.</p>

      <div className="reports-section">
        <div className="reports-list">
          {allReports.map((report) => {
            const outdated = isOutdated(report.timestamp);
            return (
              <div key={report.id} className={`report-card ${outdated ? 'outdated' : ''}`}>
                <div className="report-header">
                  <h3>{report.location}</h3>
                  <div className="report-badges">
                    <span className={`availability ${report.condition.toLowerCase().replace(' ', '-')}`}>
                      {report.condition}
                    </span>
                    {outdated && <span className="outdated-badge">Outdated</span>}
                  </div>
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
    </div>
  );
}

export default Reports;
