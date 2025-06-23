const replyCommentService = require('../../services/reply/reply_service');

module.exports = {
  async addReply(req, res) {
    try {
      const { commentId } = req.params;

      const replyData = {
        content: req.body.content,
        userId: req.user.id,
        commentId: commentId   // ← dari URL
      };

      const reply = await replyCommentService.createReply(replyData);

      res.status(201).json({ success: true, message: 'Reply added', data: reply });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
