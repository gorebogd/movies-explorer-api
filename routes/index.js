const router = require('express').Router();
const movieRouter = require('./movies');
const usersRouter = require('./users');

const auth = require('../middlewares/auth');
const { userCreateValidator, userSignInValidator } = require('../middlewares/validators');

const NotFoundError = require('../errors/NotFoundError');

const { createUser, login } = require('../controllers/users');

router.all('/', auth);

router.post('/signup', userCreateValidator, createUser);
router.post('/signin', userSignInValidator, login);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, movieRouter);

router.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден.');
});

module.exports = router;
