import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/destination">Destination Entry</Link></li>
        <li><Link to="/parking-options">Parking Options</Link></li>
        <li><Link to="/conditions">Parking Conditions</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/report-condition">Report Condition</Link></li>
        <li><Link to="/navigation">Navigation</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
