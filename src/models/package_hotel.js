'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class package_hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      package_hotel.belongsTo(models.package_umroh, {
        foreignKey: 'id_package',
      });
      package_hotel.belongsTo(models.master_hotel, {
        foreignKey: 'id_hotel',
      });
    }
  }
  package_hotel.init({

    id_package: DataTypes.INTEGER,
    id_hotel: DataTypes.INTEGER,
    description: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'package_hotel',
  });
  return package_hotel;
};