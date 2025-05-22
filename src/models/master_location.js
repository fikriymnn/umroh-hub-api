'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class master_location_departure extends Model {
    static associate(models) {

      master_location_departure.hasMany(models.package_umroh, {
        foreignKey: 'id_location_departure',
      });
    }
  }
  master_location_departure.init({
    location_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'master_location_departure',
    tableName: 'master_location_departure',
  });
  return master_location_departure;
};
