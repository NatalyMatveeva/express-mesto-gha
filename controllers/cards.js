/* eslint-disable */
const Card = require('../models/card');


const createCard = (req, res) => {
  const userId = req.user._id;
  const{name, link} = req.body;
  Card.create ({name, link, owner: userId})
  .then((card) => res.status(200).send({data: card}))
  .catch((error) => {
    if (error.name = "ValidatorError") {
      return res.status(400).send({ message: "Переданы не корректные данные" })
    }
    return res.status(500).send({ message: error });
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
      if (error.name ="ValidatorError"){
        return res.status(400).send({ message: "Переданы некорректные данные " })
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
  if (cards ==null){
     res.status(404).send({ message: "Передан несуществующий _id карточки" })
  }
  res.status(200).send({data:cards});
})
.catch((error) => {
  if (error.name = "CastError"){
    res.status(400).send({ message: "Переданы некорректные данные для постановки лайка" })
}
  else {
    res.status(500).send({ message: error })
  };
});
}

 const dislikeCard = (req, res) =>{
Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
.then((cards) => {
  if (cards ==null){
     res.status(404).send({ message: "Передан несуществующий _id карточки" })
  }
  res.status(200).send({data:cards});
})
.catch((error) => {
  if (error.name = "CastError"){
    res.status(400).send({ message: "Переданы некорректные данные для снятия лайка" })
}
  else {
    res.status(500).send({ message: error })
  };
});
}

module.exports = {createCard, deleteCard, getCards, dislikeCard, likeCard}