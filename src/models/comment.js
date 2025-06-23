'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      comment.belongsTo(models.Post, { foreignKey: 'postId' });
      comment.belongsTo(models.User, { foreignKey: 'userId' });
      comment.hasMany(models.reply_comment, {
        foreignKey: 'commentId',
        as: 'reply_comments',
      });
    }
  }

  comment.init({
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
     like: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
  }, {
    sequelize,
    modelName: 'comment',
  });

  return comment;
};
