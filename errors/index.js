const BadRequestError = require('./bad-request.js');
const NotFoundError = require('./not-found.js');
const UnauthenticatedError = require('./unauthenticated.js');
const ForbiddenError = require('./forbidden.js');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  ForbiddenError,
};
