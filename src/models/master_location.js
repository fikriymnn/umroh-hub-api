'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class master_location extends Model {
    static associate(models) {

      master_location.hasMany(models.package_umroh, {
        foreignKey: 'id_location_departure',
      });
    }
  }
  master_location.init({
    location_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'master_location',
  });
  return master_location;
};
