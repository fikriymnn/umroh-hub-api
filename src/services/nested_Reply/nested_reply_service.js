const models = require('../../models');

const createNestedReply = async (commentId, parentReplyId, userId, content) => {
  return await models.reply_comment.create({
    commentId,
    parent_reply_id: parentReplyId,
    userId,
    content
  });
};

const getReplyWithChildren = async (replyId) => {
  return await models.reply_comment.findByPk(replyId, {
    include: [
      {
        model: models.reply_comment,
        as: 'childReplies',
        include: [{ model: models.User, attributes: ['id', 'name'] }]
      },
      { model: models.User, attributes: ['id', 'name'] }
    ]
  });
};

module.exports = {
  createNestedReply,
  getReplyWithChildren
};
