const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => new NotFoundError('Нет фильмов в избранном.'))
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ ...req.body, owner: _id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Введены некорректные данные');
      }
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId).select('+owner')
    .orFail(() => new NotFoundError('Фильма с таким id нет.'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять фильмы других пользователей.');
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send('Фильм ыбыл успешно удален'));
    })
    .catch(next);
};

module.exports = {
  getUserMovies,
  addMovie,
  removeMovie,
};
