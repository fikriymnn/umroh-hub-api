'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class package_facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      package_facilities.belongsTo(models.package_umroh, {
        foreignKey: 'id_package',
      });
    }
  }
  package_facilities.init({
    id_package: DataTypes.INTEGER,
    description: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'package_facilities',
  });
  return package_facilities;
};