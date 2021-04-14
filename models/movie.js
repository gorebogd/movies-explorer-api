const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле country обязательно к заполнению.'],
  },
  director: {
    type: String,
    required: [true, 'Поле director обязательно к заполнению.'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration обязательно к заполнению.'],
  },
  year: {
    type: String,
    required: [true, 'Поле year обязательно к заполнению.'],
  },
  description: {
    type: String,
    required: [true, 'Поле description обязательно к заполнению.'],
  },
  image: {
    type: String,
    required: [true, 'Поле image обязательно к заполнению.'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введен неверный формат ссылки',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле trailer обязательно к заполнению.'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введен неверный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail обязательно к заполнению.'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введен не верный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле owner обязательно к заполнению.'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Поле movieId обязательно к заполнению.'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU обязательно к заполнению.'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN обязательно к заполнению.'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
