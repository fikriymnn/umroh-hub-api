const express = require('express');
const router = express.Router();
const replyController = require('../../controllers/reply/reply_controller');
const auth = require('../../middlewares/auth');

router.post('/:commentId',auth(['user']), replyController.addReply);

module.exports = router;
