import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ParkingOptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination } = location.state || { destination: 'Sample Destination' };
  const [viewMode, setViewMode] = useState('list');

  const parkingOptions = [
    {
      id: 1,
      name: 'Lot 1 - Main Street',
      distance: '0.3 miles',
      permit: 'Student Permit Required',
      cost: '$2.00/hour',
      availability: 'Open',
      walkingTime: '5 min',
      lat: 39.7284,
      lng: -121.8375
    },
    {
      id: 2,
      name: 'Lot 2 - Second Street',
      distance: '0.5 miles',
      permit: 'Any Permit',
      cost: '$1.50/hour',
      availability: 'Nearly Full',
      walkingTime: '8 min',
      lat: 39.7294,
      lng: -121.8385
    },
    {
      id: 3,
      name: 'Lot 3 - West Campus',
      distance: '0.7 miles',
      permit: 'No Permit Required',
      cost: 'Free',
      availability: 'Open',
      walkingTime: '12 min',
      lat: 39.7274,
      lng: -121.8395
    },
    {
      id: 4,
      name: 'Structure A - North',
      distance: '0.4 miles',
      permit: 'Faculty/Staff Permit',
      cost: '$3.00/hour',
      availability: 'Full',
      walkingTime: '7 min',
      lat: 39.7304,
      lng: -121.8365
    }
  ];

  const handleSelectParking = (option) => {
    navigate('/conditions', { state: { destination, parkingOption: option } });
  };

  return (
    <div className="page">
      <h1>Parking Options</h1>
      <p>Destination: <strong>{destination}</strong></p>
      <p>View and compare parking options near your destination.</p>

      <div className="view-toggle">
        <button
          className={viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setViewMode('list')}
        >
          List View
        </button>
        <button
          className={viewMode === 'map' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setViewMode('map')}
        >
          Map View
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="parking-options-list">
          {parkingOptions.map((option) => (
            <div key={option.id} className="parking-option-card">
              <h3>{option.name}</h3>
              <div className="option-details">
                <p><strong>Distance:</strong> {option.distance}</p>
                <p><strong>Walking Time:</strong> {option.walkingTime}</p>
                <div className="permit-info">
                  <p><strong>Permit Requirement:</strong></p>
                  <p className="permit-text">{option.permit}</p>
                </div>
                <p><strong>Cost:</strong> {option.cost}</p>
                <p>
                  <strong>Availability:</strong>{' '}
                  <span className={`availability ${option.availability.toLowerCase().replace(' ', '-')}`}>
                    {option.availability}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleSelectParking(option)}
                className="btn-primary"
                disabled={option.availability === 'Full'}
              >
                {option.availability === 'Full' ? 'Full - Select Another' : 'View Details'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="map-view">
          <div className="map-placeholder">
            <h3>Map View</h3>
            <p>Map integration will display parking locations here</p>
            <div className="map-markers">
              {parkingOptions.map((option) => (
                <div key={option.id} className="map-marker">
                  <span className={`marker-dot ${option.availability.toLowerCase().replace(' ', '-')}`}></span>
                  <span className="marker-label">{option.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParkingOptions;
