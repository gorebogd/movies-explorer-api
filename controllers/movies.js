const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => new NotFoundError('Нет фильмов в избранном.'))
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.body.movieId })
    .then((movie) => {
      if (movie) {
        throw new ForbiddenError('Фильм уже добавлен в избранное');
      }
      return Movie.create({
        ...req.body,
        owner: req.user._id,
      });
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильма с таким id нет.'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять фильмы других пользователей.');
      }
      return Movie.findByIdAndRemove(movieId)
        .then((m) => res.send(m));
    })
    .catch(next);
};

module.exports = {
  getUserMovies,
  addMovie,
  removeMovie,
};
