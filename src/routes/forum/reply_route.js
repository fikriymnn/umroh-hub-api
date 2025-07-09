const express = require('express');
const router = express.Router();
const replyController = require('../../controllers/reply/reply_controller');
const auth = require('../../middlewares/auth');
const Nreply = require('../../controllers/nested_reply/nested_reply_controller')

router.post('/:commentId',auth(['user']), replyController.addReply);
// routes/forum/reply_comment.js
router.post('/:commentId/reply/:replyId', auth(['user']), Nreply.replyToReply);
router.get('/thread/:replyId', Nreply.getReplyThread);

module.exports = router;
