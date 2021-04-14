require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(process.env.MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
