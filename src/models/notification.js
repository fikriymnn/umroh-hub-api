'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    static associate(models) {
      notification.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  notification.init({
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,         // contoh: 'payment', 'approval', dsb
    message: DataTypes.STRING,
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'notification',
  });

  return notification;
};
