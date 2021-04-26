const router = require('express').Router();
const { movieBodyValidator, movieIdValidator } = require('../middlewares/validators');

const {
  getUserMovies, addMovie, removeMovie,
} = require('../controllers/movies');

router.get('/', getUserMovies);
router.post('/', movieBodyValidator, addMovie);
router.delete('/:movieId', movieIdValidator, removeMovie);

module.exports = router;
