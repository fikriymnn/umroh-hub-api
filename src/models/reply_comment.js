'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reply_comment extends Model {
    static associate(models) {
      reply_comment.belongsTo(models.comment, {
        foreignKey: 'commentId',
        as: 'comment',
      });
      reply_comment.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }

  reply_comment.init({
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reply_comment',
  });

  return reply_comment;
};
