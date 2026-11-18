import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DestinationEntry() {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      navigate('/parking-options', { state: { destination } });
    }
  };

  return (
    <div className="page">
      <h1>Destination Entry</h1>
      <p>Enter your campus destination to find parking options.</p>
      
      <form onSubmit={handleSubmit} className="destination-form">
        <div className="form-group">
          <label htmlFor="destination">Campus Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Plumas Hall, Library, Student Union"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Find Parking
        </button>
      </form>

      <div className="quick-destinations">
        <h3>Quick Select:</h3>
        <div className="destination-buttons">
          <button
            type="button"
            onClick={() => navigate('/parking-options', { state: { destination: 'Plumas Hall' } })}
            className="btn-secondary"
          >
            Plumas Hall
          </button>
          <button
            type="button"
            onClick={() => navigate('/parking-options', { state: { destination: 'Library' } })}
            className="btn-secondary"
          >
            Library
          </button>
          <button
            type="button"
            onClick={() => navigate('/parking-options', { state: { destination: 'Student Union' } })}
            className="btn-secondary"
          >
            Student Union
          </button>
          <button
            type="button"
            onClick={() => navigate('/parking-options', { state: { destination: 'BMU' } })}
            className="btn-secondary"
          >
            BMU
          </button>
        </div>
      </div>
    </div>
  );
}

export default DestinationEntry;
