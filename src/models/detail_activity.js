'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detail_activity.belongsTo(models.package_schedule, {
        foreignKey: 'id_schedule',
      });
    }
  }
  detail_activity.init({
    id_schedule: DataTypes.INTEGER,
    description: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'detail_activity',
  });
  return detail_activity;
};