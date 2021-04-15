# movies-explorer-api

https://api.gorebogd.nomoredomains.club/

## Запуск проекта

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload

## Описание

### возвращает информацию о пользователе (email и имя)
GET /users/me

### обновляет информацию о пользователе (email и имя)
PATCH /users/me

### возвращает все сохранённые пользователем фильмы
GET /movies

### создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
POST /movies

### удаляет сохранённый фильм по _id
DELETE /movies/movieId


