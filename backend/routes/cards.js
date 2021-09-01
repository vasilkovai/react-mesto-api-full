const router = require('express').Router();
const {
  validateCardCreation,
  validateCardId,
  validateLikesId,
} = require('../middlewares/validator');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardCreation, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateLikesId, likeCard);
router.delete('/:cardId/likes', validateLikesId, dislikeCard);

module.exports = router;
