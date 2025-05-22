'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class package_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      package_image.belongsTo(models.package_umroh, {
        foreignKey: 'id_package',
      });
    }
  }
  package_image.init({
    id_package: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'package_image',
    tableName: 'package_image',
  });
  return package_image;
};