/* eslint-disable */
const Card = require('../models/card');


const createCard = (req, res) => {
  const{name, link, owner} = req.body;
  Card.create ({name, link, owner})
  .then((card) => {
    res.status(200).send(card);
  })
  .catch((error) => {
    if (error.name = "ValidatorError"){
      return res.status(400).send({ message: "Переданы не корректные данные" })
    }
    else {res.status(500).send({ message: error })};
  });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
  .then(
    (card) => {
      if (!card) return res.status(404).send({ message: "Такой карточки не существует" });
    return card.remove().then(() => res.status(200).send(card));
  })
  .catch((error) => {
       res.status(500).send({ message: error });
  });
  }

  const getCards = (req, res) => {
    Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
    res.status(500).send({ message: error });
    });
    }



const likeCard = (req, res) => {
Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.body.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
.then((cards) => {
  res.status(200).send(cards);
})
.catch((error) => {
  if (error.name === "CastError"){
    return res.status(400).send({ message: "Передан несуществующий _id карточки" })
}
else if (req.body.user._id !== "631c6b3b8876fa14580096c7"){
  return res.status(404).send({ message: "Переданы некорректные данные для постановки лайка" })
}
  else {
    res.status(500).send({ message: error })
  };
});
}

 const dislikeCard = (req, res) =>{
Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.body.user._id } }, // убрать _id из массива
  { new: true },
)
.then((cards) => {
  res.status(200).send(cards);
})
.catch((error) => {
  if (error.name === "CastError"){
    return res.status(400).send({ message: "Передан несуществующий _id карточки" })
}
else if (req.body.user._id !== "631c6b3b8876fa14580096c7"){
  return res.status(404).send({ message: "Переданы некорректные данные для снятия лайка" })
}
  else {res.status(500).send({ message: error })};
});
}

module.exports = {createCard, deleteCard, getCards, dislikeCard, likeCard}