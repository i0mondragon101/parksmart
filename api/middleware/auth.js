const jwt = require('jsonwebtoken');
const supabase = require('../config/db');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid access token'
      });
    }

    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing access token'
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired access token'
      });
    }

    req.user = {
      id: data.user.id,
      email: data.user.email
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication failed'
    });
  }
};

module.exports = authMiddleware;
