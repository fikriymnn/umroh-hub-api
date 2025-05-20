'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class package_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      package_schedule.belongsTo(models.package_umroh, {
        foreignKey: 'id_package',
      });
      package_schedule.hasMany(models.detail_activity, {
        foreignKey: 'id_schedule',
      });
    }
  }
  package_schedule.init({
    id_package: DataTypes.INTEGER,
    title: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'package_schedule',
    freezeTableName: true,
  });
  return package_schedule;
};