const { reaction } = require('../../models');

module.exports = {
  async createOrUpdateReaction({ postId, userId, type }) {
    const existing = await reaction.findOne({
      where: { postId, userId }
    });

    if (existing) {
      existing.type = type;
      await existing.save();
      return existing;
    } else {
      return await reaction.create({ postId, userId, type });
    }
  }
};
