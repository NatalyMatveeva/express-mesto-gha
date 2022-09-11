/* eslint-disable */
const {createUser,  getUsersById,  getUsers, updateProfile, patchMeAvatar} = require ('../controllers/users')

const router = require('express').Router();

router.post('/', createUser)
router.get('/:userId', getUsersById)
router.get('/', getUsers)

router.patch('/me/avatar', patchMeAvatar)
router.patch('/me', updateProfile)



module.exports = router;