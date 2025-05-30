const express = require('express');
const router = express.Router();
// const upload = require('../../middlewares/upload');
const userController = require('../../controllers/users/users_controllers');
const  authenticate  = require('../../middlewares/auth');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.patch('/:id/deactivate', userController.deactivateUser);
router.delete('/:id', userController.deleteUser);
router.get('/me', authenticate(['user']), userController.getMe)

module.exports = router;
