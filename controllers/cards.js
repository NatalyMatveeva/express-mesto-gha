/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
const Card = require('../models/card');

const createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные ' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then(
      (card) => {
        if (!card) return res.status(404).send({ message: 'Такой карточки не существует' });
        return card.remove().then(() => res.status(200).send(card));
      },
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные ' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные ' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((cards) => {
      if (cards == null) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные ' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((cards) => {
      if (cards == null) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

module.exports = {
  createCard, deleteCard, getCards, dislikeCard, likeCard,
};
