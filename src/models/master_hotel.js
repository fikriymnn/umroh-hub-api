'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      master_hotel.hasMany(models.package_hotel, {
        foreignKey: 'id_hotel',
      });
      master_hotel.hasMany(models.hotel_facilities, {
        foreignKey: 'id_hotel',
      });
    }
  }
  master_hotel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_mitra: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    hotel_name: DataTypes.STRING,
    hotel_type: DataTypes.STRING,
    address: DataTypes.STRING,
    room_type: DataTypes.STRING,
    image_url: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'master_hotel',
    tableName: 'master_hotel'
  });
  return master_hotel;
};