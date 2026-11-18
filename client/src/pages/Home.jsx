function Home() {
  return (
    <div className="page">
      <h1>Welcome to ParkSmart</h1>
      <p>Find realistic campus parking options and reduce the time and stress of searching for parking before class.</p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Enter a campus destination and view parking options</li>
          <li>View parking locations, current reported conditions, permit requirements, and costs</li>
          <li>View parking conditions on a map</li>
          <li>View current parking conditions and recent user reports with timestamps</li>
          <li>Submit parking-condition updates</li>
          <li>Receive driving and walking directions</li>
          <li>Access your most recent route and parking location</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
