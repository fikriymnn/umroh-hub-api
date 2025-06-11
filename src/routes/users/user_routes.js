const express = require('express');
const router = express.Router();
// const upload = require('../../middlewares/upload');
const userController = require('../../controllers/users/users_controllers');
const authenticate = require('../../middlewares/auth');

router.get('/me', authenticate(['user']), userController.getMe)
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);
router.patch('/:id/reactivate', userController.reactivateUser);
router.patch('/:id/deactivate', userController.deactivateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
