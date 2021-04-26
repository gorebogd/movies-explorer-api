const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const UniqueError = require('../errors/UniqueError');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  AUTH_REQUIRED_MESSAGE,
  NOT_FOUND_MESSAGE,
  UNIQUE_USER_ERROR_MESSAGE,
} = require('../utils/constants');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError(AUTH_REQUIRED_MESSAGE);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET
          : 'dev-jwt-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      } else {
        res.send(user);
      }
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.code === 11000 && err.name === 'MongoError') {
        return next(new UniqueError(UNIQUE_USER_ERROR_MESSAGE));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    })
    .then((user) => {
      res.status(200).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      if (err.code === 11000 && err.name === 'MongoError') {
        return next(new UniqueError(UNIQUE_USER_ERROR_MESSAGE));
      }
      return next(err);
    });
};

module.exports = {
  login,
  getUser,
  createUser,
  updateUser,
};
