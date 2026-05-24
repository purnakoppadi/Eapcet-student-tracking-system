const AppError = require('../utils/AppError');

function notFound(req, res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

function errorHandler(err, req, res, next) {
  let error = err;

  if (err.name === 'CastError') {
    error = new AppError(`Invalid ${err.path}.`, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'value';
    error = new AppError(`${field} already exists.`, 409);
  }

  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((item) => item.message);
    error = new AppError('Validation failed.', 400, details);
  }

  if (err.name === 'MulterError') {
    error = new AppError(err.message, 400);
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = new AppError('Request body contains invalid JSON.', 400);
  }

  const statusCode = error.statusCode || err.statusCode || (typeof err.status === 'number' ? err.status : 500);
  const payload = {
    success: false,
    message: error.isOperational ? error.message : 'Internal server error.',
  };

  if (error.details) payload.errors = error.details;
  if (process.env.NODE_ENV !== 'production' && !error.isOperational) payload.error = error.message;

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json(payload);
}

module.exports = { notFound, errorHandler };
