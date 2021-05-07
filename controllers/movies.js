const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const { BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE, MOVIE_DELETION_FORBIDDEN_MESSAGE } = require('../utils/constants');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ ...req.body, owner: _id })
    .then((movie) => res.send(res.send(movie)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId).select('+owner')
    .orFail(() => new NotFoundError(NOT_FOUND_MESSAGE))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MOVIE_DELETION_FORBIDDEN_MESSAGE);
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
