/* eslint-disable */
const Card = require('../models/card');


const createCard = (req, res) => {
  const{name, link} = req.body;
  Card.create ({name, link})
  .then((card) => {
    res.status(200).send(card);
  })
  .catch((error) => {
    if (error.name === "ValidatorError"){
      return res.status(400).send({ message: "Переданы не корректные данные" })
    }
    else {res.status(500).send({ message: error })};
  });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.id)
  .then((card) => {
    return card.remove().then(() => res.status(200).send(card));

  })
  .catch((error) => {
    if (error.name === "ValidatorError"){
      return res.status(404).send({ message: "Переданы не корректные данные" })
    }
       else {res.status(500).send({ message: error })};
  });
      }

  const getCards = (req, res) => {
    Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
      if (error.name === "ValidatorError"){
        return res.status(400).send({ message: "Переданы не корректные данные" })
    }
     else {res.status(500).send({ message: error })};
    });
    }



const likeCard = (req, res) => {
Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
.then((cards) => {
  res.status(200).send(cards);
})
.catch((error) => {
  res.status(500).send({ message: error });
});
}

 const dislikeCard = (req, res) =>{
Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
.then((cards) => {
  res.status(200).send(cards);
})
.catch((error) => {
  res.status(500).send({ message: error });
});
}

module.exports = {createCard, deleteCard, getCards, dislikeCard, likeCard}