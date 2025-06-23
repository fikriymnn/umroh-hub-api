const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/comment/comment_controller');
const auth = require('../../middlewares/auth');

// POST komentar ke postingan tertentu
router.post('/:postId', auth(['user']), commentController.addComment);

// Like komentar tertentu
router.post('/like/:id', auth(['user']), commentController.likeComment);

// Ambil semua komentar dari post tertentu, diurutkan berdasarkan like
router.get('/post/:postId', commentController.getCommentsByPost);

module.exports = router;
