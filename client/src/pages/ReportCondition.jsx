import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ReportCondition() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parkingOption } = location.state || {};
  const [condition, setCondition] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (condition) {
      setSubmitted(true);
      setTimeout(() => {
        navigate('/reports');
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="page">
        <h1>Report Submitted</h1>
        <div className="success-message">
          <p>Thank you for reporting the parking condition!</p>
          <p>Your report helps other students make informed parking decisions.</p>
          <p>Redirecting to reports page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Report Parking Condition</h1>
      <p>Submit a parking condition update to help other students.</p>

      {parkingOption && (
        <div className="location-info">
          <p><strong>Location:</strong> {parkingOption.name}</p>
        </div>
      )}

      <div className="arrival-prompt">
        <h2>Have you arrived at your parking location?</h2>
        <p>Please report the current parking condition to help other students find available spaces.</p>
      </div>

      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-group">
          <label htmlFor="condition">Current Parking Condition:</label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="">Select condition...</option>
            <option value="Open">Open - Plenty of spaces available</option>
            <option value="Nearly Full">Nearly Full - Limited spaces available</option>
            <option value="Full">Full - No spaces available</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={!condition}>
          Submit Report
        </button>
      </form>

      <div className="report-tips">
        <h3>Tips for Accurate Reporting:</h3>
        <ul>
          <li>Report only after you've arrived and observed the actual conditions</li>
          <li>Consider reporting again if conditions change significantly</li>
          <li>Reports help students avoid driving to full parking lots</li>
        </ul>
      </div>
    </div>
  );
}

export default ReportCondition;
