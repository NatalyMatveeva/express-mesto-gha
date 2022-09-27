const {
  getUsersById, getUsers, updateProfile, patchMeAvatar, getCurrentUser,
} = require('../controllers/users');

// eslint-disable-next-line import/order
const router = require('express').Router();

router.get('/me', getCurrentUser);
router.get('/:userId', getUsersById);
router.get('/', getUsers);

router.patch('/me/avatar', patchMeAvatar);
router.patch('/me', updateProfile);

module.exports = router;
