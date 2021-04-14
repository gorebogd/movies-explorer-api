const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const UniqueError = require('../errors/UniqueError');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError('Авторизация не пройдена!');
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
        throw new NotFoundError('Нет пользователя с таким id.');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new AuthError('Неверно введен id.'));
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  if (req.body.password.length < 8) {
    throw new BadRequestError('Длина пароля менее 8 символов.');
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
      }))
      .then((newUser) => {
        if (!newUser) {
          throw new NotFoundError('Неправильно переданы данные.');
        } else {
          res.send({
            email: newUser.email,
            name: newUser.name,
          });
        }
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Ошибка валидации. Введены некорректные данные.'));
        } else if (err.code === 11000 || err.name === 'MongoError') {
          next(new UniqueError('Есть пользователь с тамим email.'));
        }
        next(err);
      });
  }
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id.');
      } else {
        res.status(200).send({ email: user.email, name: user.name });
      }
    })
    .catch(next);
};

module.exports = {
  login,
  getUser,
  createUser,
  updateUser,
};
