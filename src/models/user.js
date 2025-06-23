'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     User.associate = function(models) {
  User.hasMany(models.Post, { foreignKey: 'user_id' });
  User.hasMany(models.Comment, { foreignKey: 'user_id' });
  User.hasMany(models.Reply, { foreignKey: 'user_id' });
  User.hasMany(models.Reaction, { foreignKey: 'user_id' });
  
};

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