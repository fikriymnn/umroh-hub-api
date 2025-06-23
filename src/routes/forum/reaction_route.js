const express = require('express');
const router = express.Router();
const reactionController = require('../../controllers/reaction/reaction_controller');
const auth = require('../../middlewares/auth');

// Tambahkan atau update reaksi ke post
router.post('/:postId', auth(['user']), reactionController.reactToPost);

module.exports = router;
