'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jamaah extends Model {
    static associate(models) {
      // Jamaah milik satu Order
      jamaah.belongsTo(models.order, {
        foreignKey: 'id_order',
        as: 'order'
      });
    }
  }
  jamaah.init({
    id_order: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'), // tambahkan enum opsional
    phone_number: DataTypes.STRING,
    ktp_url: DataTypes.STRING,
    kk_url: DataTypes.STRING,
    passport_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jamaah',
       tableName: 'jamaah',
     freezeTableName: true
  });
  return jamaah;
};
