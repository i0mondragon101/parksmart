const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const authMiddleware = require('../middleware/auth');

router.post('/', async (req, res, next) => {
  try {
    const { email, password, display_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email and password are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Password must be at least 8 characters'
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: display_name || null
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return res.status(409).json({
          error: 'Conflict',
          message: 'Email already registered'
        });
      }
      throw error;
    }

    res.status(201).json({
      message: 'Registration accepted; confirm your email if required.',
      user_id: data.user?.id || null
    });
  } catch (error) {
    next(error);
  }
});

router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Profile not found'
        });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.patch('/me', authMiddleware, async (req, res, next) => {
  try {
    const { display_name } = req.body;

    if (display_name === undefined) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'At least one field must be provided'
      });
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ display_name })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Profile not found'
        });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete('/me', authMiddleware, async (req, res, next) => {
  try {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      req.user.id
    );

    if (deleteError) {
      throw deleteError;
    }

    res.status(204).send();
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to delete account'
    });
  }
});

module.exports = router;
