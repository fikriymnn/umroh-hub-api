'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reply_comment extends Model {
    static associate(models) {
      // Relasi ke komentar utama
      reply_comment.belongsTo(models.comment, {
        foreignKey: 'commentId',
        as: 'comment',
      });

      // Relasi ke user yang membalas
      reply_comment.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      // Relasi ke reply parent (jika ini merupakan balasan dari reply lain)
      reply_comment.belongsTo(models.reply_comment, {
        foreignKey: 'parent_reply_id',
        as: 'parentReply',
      });

      // Relasi ke reply anak-anak (jika reply ini punya balasan)
      reply_comment.hasMany(models.reply_comment, {
        foreignKey: 'parent_reply_id',
        as: 'childReplies',
      });
    }
  }

  reply_comment.init({
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    parent_reply_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'reply_comment',
  });

  return reply_comment;
};
