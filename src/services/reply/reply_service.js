const { reply_comment: ReplyComment } = require('../../models');

module.exports = {
  async createReply(data) {
    return await ReplyComment.create(data);
  }
};
