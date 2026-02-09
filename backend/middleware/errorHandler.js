// /**
//  * Custom error handler middleware
//  */
// const errorHandler = (err, req, res, next) => {
//   let error = { ...err };
//   error.message = err.message;

//   // Log error for debugging
//   console.error('Error:', err);

//   // Mongoose bad ObjectId
//   if (err.name === 'CastError') {
//     const message = 'Resource not found';
//     error = { message, statusCode: 404 };
//   }

//   // Mongoose duplicate key
//   if (err.code === 11000) {
//     const field = Object.keys(err.keyValue)[0];
//     const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
//     error = { message, statusCode: 400 };
//   }

//   // Mongoose validation error
//   if (err.name === 'ValidationError') {
//     const message = Object.values(err.errors).map(val => val.message).join(', ');
//     error = { message, statusCode: 400 };
//   }

//   // JWT errors
//   if (err.name === 'JsonWebTokenError') {
//     const message = 'Invalid token';
//     error = { message, statusCode: 401 };
//   }

//   if (err.name === 'TokenExpiredError') {
//     const message = 'Token expired';
//     error = { message, statusCode: 401 };
//   }

//   res.status(error.statusCode || 500).json({
//     success: false,
//     message: error.message || 'Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// };

// module.exports = errorHandler;

/**
 * Custom error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', err.message);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = {
      message: 'Resource not found',
      statusCode: 404
    };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = {
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      statusCode: 400
    };
  }

  // ✅ Mongoose validation error (UPDATED)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(' | ');

    error = {
      message,
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      statusCode: 401
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
