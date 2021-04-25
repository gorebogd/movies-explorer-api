const WRONG_CREDENTIALS_MESSAGE = 'Неправильные почта или пароль';
const BAD_REQUEST_MESSAGE = 'Переданные данные некорректны';
const UNIQUE_USER_ERROR_MESSAGE = 'Пользователь с таким электронным адресом уже существует';
const UNIQUE_MOVIE_ERROR_MESSAGE = 'Фильм с таким URL-адресом уже сохранен';
const USER_CREATION_SUCCESS_MESSAGE = 'Пользователь успешно создан';
const AUTH_REQUIRED_MESSAGE = 'Необходима авторизация';
const NOT_FOUND_MESSAGE = 'Запрашиваемый ресурс не найден';
const WRONG_MOVIE_ID_MESSAGE = 'Неверный идентификатор фильма';
const MOVIE_DELETION_FORBIDDEN_MESSAGE = 'Вы не можете удалять фильма, которые были добавлены не вами';
const MOVIE_ADDITION_SUCCESS_MESSAGE = 'Фильм был успешно сохранен';
const MOVIE_DELETION_SUCCESS_MESSAGE = 'Фильм был успешно удален';
const MONGO_CONNECTION_SUCCESS_MESSAGE = 'База данных успешно подключена';
const MONGO_CONNECTION_FAIL_MESSAGE = 'Ошибка подключения базы данных';
const SERVER_ERROR_MESSAGE = 'Ошибка на стороне сервера';

module.exports = {
  WRONG_CREDENTIALS_MESSAGE,
  BAD_REQUEST_MESSAGE,
  UNIQUE_USER_ERROR_MESSAGE,
  UNIQUE_MOVIE_ERROR_MESSAGE,
  USER_CREATION_SUCCESS_MESSAGE,
  AUTH_REQUIRED_MESSAGE,
  NOT_FOUND_MESSAGE,
  WRONG_MOVIE_ID_MESSAGE,
  MOVIE_DELETION_FORBIDDEN_MESSAGE,
  MOVIE_DELETION_SUCCESS_MESSAGE,
  MOVIE_ADDITION_SUCCESS_MESSAGE,
  MONGO_CONNECTION_SUCCESS_MESSAGE,
  MONGO_CONNECTION_FAIL_MESSAGE,
  SERVER_ERROR_MESSAGE,
};
