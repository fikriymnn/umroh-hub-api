'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hotel_facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hotel_facilities.belongsTo(models.master_hotel, {
        foreignKey: 'id_hotel',
      });
    }
  }
  hotel_facilities.init({
    id_hotel: DataTypes.INTEGER,
    description: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'hotel_facilities',
  });
  return hotel_facilities;
};