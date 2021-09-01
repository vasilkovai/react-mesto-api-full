const router = require('express').Router();
const {
  validateUserId,
  validateUserInfo,
  validateUserAvatar,
} = require('../middlewares/validator');
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUserInfo, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
