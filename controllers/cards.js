/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
const Card = require('../models/card');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(
      (card) => {
        if (!card) {
          throw new NotFound('Карточка с указанным id не найдена');
        }
        if (card.owner._id.toString() !== req.user._id.toString()) {
          throw new ForbiddenError('Вы не можете удалить чужую карточку');
        }
        card.remove();
        return res.status(200).send({ message: 'Карточка удалена' });
      },
    )
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((cards) => {
      if (cards == null) {
        throw new NotFound('Карточка с указанным id не найдена');
      }
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((cards) => {
      if (cards == null) {
        throw new NotFound('Карточка с указанным id не найдена');
      }
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
