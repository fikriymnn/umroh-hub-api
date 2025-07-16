'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'user_id' });
      User.hasMany(models.comment, { foreignKey: 'user_id' });
      User.hasMany(models.reply_comment, { foreignKey: 'user_id' });
      User.hasMany(models.reaction, { foreignKey: 'user_id' });
      User.hasMany(models.review, { foreignKey: 'id_user' });
      User.hasMany(models.order, { foreignKey: 'id_user', as: 'orders' });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    no_ktp: DataTypes.STRING,
    image_url: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  });

  return User;
};
