/* eslint-disable */
const {createCard, deleteCard, getCards, likeCard, dislikeCard} = require ('../controllers/cards')

const router = require('express').Router();

router.get('/', createCard)
router.post('/', getCards)
router.delete('/:cardId', deleteCard)

router.put('/:cardId', likeCard)
router.delete('/:cardId', dislikeCard)


module.exports = router;