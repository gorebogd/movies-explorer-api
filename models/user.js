const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const { WRONG_CREDENTIALS_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле E-mail обязательно к заполнению.'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введен неверный формат email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле Пароль обязательно к заполнению.'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле Имя обязательно к заполнению.'],
    minlength: [2, 'Минимальная длина имени 2 символа.'],
    maxlength: [30, 'Максимальная длина имени 30 символов.'],
  },
});

userSchema.statics.findUserByCredentials = function find(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(WRONG_CREDENTIALS_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(WRONG_CREDENTIALS_MESSAGE));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
