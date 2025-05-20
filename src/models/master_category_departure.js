'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_category_departure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      master_category_departure.hasMany(models.package_umroh, {
        foreignKey: 'id_category_departure',
      });
    }
  }
  master_category_departure.init({
    category_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'master_category_departure',
  });
  return master_category_departure;
};