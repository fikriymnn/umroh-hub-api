'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userid',
      });
      Post.hasMany(models.comment, {
        foreignKey: 'postId',
      });
      Post.hasMany(models.reaction, {
        foreignKey: 'postId',
      });
    
    }
  }

  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};
