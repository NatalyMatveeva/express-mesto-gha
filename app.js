const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '631c6b3b8876fa14580096c7' };

  next();
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.listen(PORT, () => { console.log(`App listening on port ${PORT}`); });
