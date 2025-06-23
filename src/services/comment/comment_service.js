const { comment } = require('../../models');

module.exports = {
  async createComment(data) {
    return await comment.create(data);
  },

  async likeComment(commentId) {
    const found = await comment.findByPk(commentId);

    if (!found) throw new Error('Comment not found');

    found.like += 1;
    await found.save();

    return found;
  },

  async getCommentsByPost(postId) {
    return await comment.findAll({
      where: { postId },
      order: [['like', 'DESC']],
    });
  }
};
