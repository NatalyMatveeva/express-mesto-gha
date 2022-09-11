/* eslint-disable */
const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const routerUsers = require('./routes/users')
const routerCards = require('./routes/cards')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/users', routerUsers)
app.use('/cards', routerCards)

app.use((req, res, next) => {
  req.user = {
    _id: '631c6b3b8876fa14580096c7' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.listen(PORT, () => {
// Если всё работает, консоль покажет, какой порт приложение слушает
console.log(`App listening on port ${PORT}`)
});