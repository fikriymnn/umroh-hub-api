const commentService = require('../../services/comment/comment_service');

module.exports = {
  async addComment(req, res) {
    try {
      const { postId } = req.params;
      const data = {
        content: req.body.content,
        userId: req.user.id,
        postId: parseInt(postId),
      };

      const comment = await commentService.createComment(data);
      res.status(201).json({ success: true, message: 'Comment created', data: comment });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async likeComment(req, res) {
    try {
      const { id } = req.params;
      const comment = await commentService.likeComment(id);
      res.json({ success: true, message: 'Liked the comment', data: comment });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getCommentsByPost(req, res) {
    try {
      const { postId } = req.params;
      const comments = await commentService.getCommentsByPost(postId);
      res.json({ success: true, data: comments });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
