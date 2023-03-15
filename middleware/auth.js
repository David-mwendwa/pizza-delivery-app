import { UnauthenticatedError, ForbiddenError } from '../errors/index.js';
import { verifyToken } from '../utils/jwt.js';

// check user authentication through bearer token or through cookies combo
export const protect = async (req, res, next) => {
  let token = null;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  // check cookies
  // TODO: update cookies function incase auth header fails
  else if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.signedCookies && req.signedCookies.token) {
    token = req.signedCookies.token;
  }
  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid. Please log in.');
  }
  const { userId, isAdmin } = await verifyToken({ token });
  req.user = { userId, isAdmin };
  next();
};

// authorize admin -> parse true/false as param
export const authorizePermissions = (isAdmin = false) => {
  return (req, res, next) => {
    if (!isAdmin) {
      throw new ForbiddenError(` You are not allowed to perfom this action`);
    }
    next();
  };
};
