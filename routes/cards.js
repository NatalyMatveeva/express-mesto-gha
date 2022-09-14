const {
  createCard, deleteCard, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');

// eslint-disable-next-line import/order
const router = require('express').Router();

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
