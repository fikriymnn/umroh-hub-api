'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class package_transportation extends Model {

    static associate(models) {
      package_transportation.belongsTo(models.package_umroh, {
        foreignKey: 'id_package',
      });
    }
  }
  package_transportation.init({
    id_package: DataTypes.INTEGER,
    description: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'package_transportation',
  });
  return package_transportation;
};