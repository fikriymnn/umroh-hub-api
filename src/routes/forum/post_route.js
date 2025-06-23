const express = require('express');
const router = express.Router();
const postController = require('../../controllers/post/post_controller');
const auth = require('../../middlewares/auth');

router.post('/', auth(['user']),postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

module.exports = router;
