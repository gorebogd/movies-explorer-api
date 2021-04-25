const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');
const { BAD_REQUEST_MESSAGE } = require('../utils/constants');

const linkValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError(BAD_REQUEST_MESSAGE);
  }
  return value;
};

const userCreateValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const userSignInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const movieBodyValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(linkValidator),
    trailer: Joi.string().required().custom(linkValidator),
    thumbnail: Joi.string().required().custom(linkValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  userCreateValidator,
  userSignInValidator,
  userUpdateValidator,
  movieBodyValidator,
  movieIdValidator,
};
