const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { parking_location_id, limit = 25, offset = 0 } = req.query;

    let query = supabase
      .from('parking_reports')
      .select('*')
      .order('submitted_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (parking_location_id) {
      query = query.eq('parking_location_id', parking_location_id);
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
    const { parking_location_id, reported_condition } = req.body;

    if (!parking_location_id || !reported_condition) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'parking_location_id and reported_condition are required'
      });
    }

    const validConditions = ['Open', 'Nearly Full', 'Full'];
    if (!validConditions.includes(reported_condition)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'reported_condition must be one of: Open, Nearly Full, Full'
      });
    }

    const { data, error } = await supabase
      .from('parking_reports')
      .insert({
        student_id: req.user.id,
        parking_location_id,
        reported_condition
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23503') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Parking location not found'
        });
      }
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:parkingReportId', authMiddleware, async (req, res, next) => {
  try {
    const { parkingReportId } = req.params;

    const { data, error } = await supabase
      .from('parking_reports')
      .select('*')
      .eq('parking_report_id', parkingReportId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Parking report not found'
        });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.patch('/:parkingReportId', authMiddleware, async (req, res, next) => {
  try {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'UPDATE on parking_reports requires additional RLS policy not yet implemented'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:parkingReportId', authMiddleware, async (req, res, next) => {
  try {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'DELETE on parking_reports requires additional RLS policy not yet implemented'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
