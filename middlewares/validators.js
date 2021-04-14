const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const userCreateValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле email обязательно.',
        'string.email': 'Неверный формат email.',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле password обязательно.',
        'string.min': 'Минимальная длина пароля 8 символов.',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле name обязательно.',
        'string.min': 'Минимальная длина имени 2 символа.',
        'string.max': 'Максимальная длина имени 30 символов.',
      }),
  }).unknown(true),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина имени 2 символа.',
        'string.max': 'Максимальная длина имени 30 символов.',
      }),
    email: Joi.string().email()
      .messages({
        'string.email': 'Неверный формат email.',
      }),
  }).unknown(true),
});

const userSignInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле email обязательно.',
        'string.email': 'Неверный формат email.',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле  password обязательно.',
        'string.min': 'Минимальная длина пароля 8 символов.',
      }),
  }).unknown(true),
});

const movieBodyValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле country обязательно.',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле director обязательно.',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле duration обязательно.',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле year обязательно.',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле description обязательно.',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Неверная ссылка в поле image.');
    })
      .messages({
        'any.required': 'Поле image обязательно.',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Неверная ссылка в поле trailer.');
    })
      .messages({
        'any.required': 'Поле trailer обязательно.',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Неверная ссылка в поле thumbnail.');
    })
      .messages({
        'any.required': 'Поле thumbnail обязательно.',
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле movieId обязательно.',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле nameRU обязательно.',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле nameEN обязательно.',
      }),
  }).unknown(true),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex()
      .message('Передан невалидный id.'),
  }).unknown(true),
});

module.exports = {
  userCreateValidator,
  userSignInValidator,
  userUpdateValidator,
  movieBodyValidator,
  movieIdValidator,
};
