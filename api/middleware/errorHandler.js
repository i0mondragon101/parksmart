const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Conflict',
      message: 'A record with this information already exists'
    });
  }

  if (err.code === '23503') {
    return res.status(409).json({
      error: 'Conflict',
      message: 'Referenced record does not exist'
    });
  }

  if (err.code === 'PGRST116') {
    return res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource was not found'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Bad Request',
      message: err.message
    });
  }

  res.status(500).json({
    error: 'Server Error',
    message: 'An unexpected error occurred'
  });
};

module.exports = errorHandler;
