import { StatusCodes } from 'http-status-codes';

const handleDevelopmentErrors = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    error: err,
    stack: err.stack,
  });
};

const handleProductionErrors = async (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, please try again later',
  };
  // handle wrong mongoose object ID error
  if (err.name === 'CastError') {
    defaultError.statusCode = StatusCodes.NOT_FOUND;
    defaultError.message = `Resource not found. Invalid: ${err.path}`;
  }

  // handle missing field error
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = Object.keys(err.errors).map(
      (key) => err.errors[key].message
    );
  }

  // handle unique value/duplicate key error
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(err.keyValue)} field must be unique`;
  }

  // handle invalid jwt
  if (err.name === 'JsonWebTokenError') {
    defaultError.statusCode = StatusCodes.UNAUTHORIZED;
    defaultError.message = `Invalid token. Please login again.`;
  }

  // handle expired jwt
  if (err.name === 'TokenExpiredError') {
    defaultError.statusCode = StatusCodes.UNAUTHORIZED;
    defaultError.message = `Token expired. Please login again.`;
  }
  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

const errorHandlerMiddleware = (err, req, res, next) => {
  let environment = process.env.NODE_ENV?.trim();
  if (environment && environment === 'production') {
    return handleProductionErrors(err, req, res, next);
  } else {
    return handleProductionErrors(err, req, res, next);
  }
};

export default errorHandlerMiddleware;
