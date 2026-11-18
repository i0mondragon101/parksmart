const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const { permit_requirement, limit = 25, offset = 0 } = req.query;

    let query = supabase
      .from('parking_locations')
      .select('*')
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (permit_requirement) {
      query = query.eq('permit_requirement', permit_requirement);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Administrator role required but not yet implemented'
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:parkingLocationId', async (req, res, next) => {
  try {
    const { parkingLocationId } = req.params;

    const { data, error } = await supabase
      .from('parking_locations')
      .select('*')
      .eq('parking_location_id', parkingLocationId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Parking location not found'
        });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.patch('/:parkingLocationId', authMiddleware, async (req, res, next) => {
  try {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Administrator role required but not yet implemented'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:parkingLocationId', authMiddleware, async (req, res, next) => {
  try {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Administrator role required but not yet implemented'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
