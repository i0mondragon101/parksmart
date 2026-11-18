import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import DestinationEntry from './pages/DestinationEntry';
import ParkingOptions from './pages/ParkingOptions';
import ParkingConditions from './pages/ParkingConditions';
import Reports from './pages/Reports';
import ReportCondition from './pages/ReportCondition';
import NavigationPage from './pages/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destination" element={<DestinationEntry />} />
            <Route path="/parking-options" element={<ParkingOptions />} />
            <Route path="/conditions" element={<ParkingConditions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/report-condition" element={<ReportCondition />} />
            <Route path="/navigation" element={<NavigationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
