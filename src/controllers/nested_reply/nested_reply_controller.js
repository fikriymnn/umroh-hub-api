const replyCommentService = require('../../services/nested_Reply/nested_reply_service');

const replyToReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;

    const reply = await replyCommentService.createNestedReply(commentId, replyId, userId, content);

    res.status(201).json({
      success: true,
      message: 'Reply to reply created',
      data: reply
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getReplyThread = async (req, res) => {
  try {
    const { replyId } = req.params;
    const reply = await replyCommentService.getReplyWithChildren(replyId);

    if (!reply) {
      return res.status(404).json({ success: false, message: 'Reply not found' });
    }

    res.status(200).json({ success: true, data: reply });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  replyToReply,
  getReplyThread
};
