require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const profilesRouter = require('./routes/profiles');
const parkingLocationsRouter = require('./routes/parkingLocations');
const parkingReportsRouter = require('./routes/parkingReports');
const recentRoutesRouter = require('./routes/recentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/profiles', profilesRouter);
app.use('/api/v1/parking-locations', parkingLocationsRouter);
app.use('/api/v1/parking-reports', parkingReportsRouter);
app.use('/api/v1/recent-routes', recentRoutesRouter);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'ParkSmart API is running' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`ParkSmart API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
});
