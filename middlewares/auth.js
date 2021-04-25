const jwt = require('jsonwebtoken');
const { AUTH_REQUIRED_MESSAGE } = require('../utils/constants');

const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(AUTH_REQUIRED_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production'
      ? JWT_SECRET
      : 'dev-jwt-secret'}`);
  } catch (err) {
    throw new AuthError(AUTH_REQUIRED_MESSAGE);
  }

  req.user = payload;

  next();
};
