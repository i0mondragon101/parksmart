const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('recent_routes')
      .select('*')
      .eq('student_id', req.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Recent route not found'
        });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { parking_location_id, route_started_at } = req.body;

    if (!parking_location_id || !route_started_at) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'parking_location_id and route_started_at are required'
      });
    }

    const { data: existing } = await supabase
      .from('recent_routes')
      .select('recent_route_id')
      .eq('student_id', req.user.id)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Student already has a recent route; use PUT to replace it'
      });
    }

    const { data, error } = await supabase
      .from('recent_routes')
      .insert({
        student_id: req.user.id,
        parking_location_id,
        route_started_at
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

router.put('/', authMiddleware, async (req, res, next) => {
  try {
    const { parking_location_id, route_started_at } = req.body;

    if (!parking_location_id || !route_started_at) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'parking_location_id and route_started_at are required'
      });
    }

    const { data, error } = await supabase
      .from('recent_routes')
      .upsert({
        student_id: req.user.id,
        parking_location_id,
        route_started_at
      }, {
        onConflict: 'student_id'
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

    const isCreated = !error && data;
    const statusCode = isCreated ? 201 : 200;
    res.status(statusCode).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete('/', authMiddleware, async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('recent_routes')
      .delete()
      .eq('student_id', req.user.id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
