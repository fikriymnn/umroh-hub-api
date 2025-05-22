const express = require('express');
const router = express.Router();
// const upload = require('../../middlewares/upload');
const userController = require('../../controllers/users/users_controllers');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
<<<<<<< HEAD
router.put('/:id', userController.updateUser);
=======
router.put('/:id', upload.single('image_url'), userController.updateUser);
>>>>>>> 01196bd9ef9a0fce9f934c687fa906fa061ce5e7
router.patch('/:id/deactivate', userController.deactivateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
