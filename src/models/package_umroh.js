'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class package_umroh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      package_umroh.belongsTo(models.mitra, {
        foreignKey: 'id_mitra',
      });
      package_umroh.belongsTo(models.master_category_departures, {
        foreignKey: 'id_category_departure',
      });
      package_umroh.belongsTo(models.master_locations, {
        foreignKey: 'is_location_departure',
      });
      package_umroh.hasMany(models.package_image, {
        foreignKey: 'id_package',
      });
    }
  }

package_umroh.init({
  id_mitra: DataTypes.INTEGER,
  is_location_departure: DataTypes.INTEGER,
  id_category_departure: DataTypes.INTEGER,
  package_name: DataTypes.STRING,
  description: DataTypes.STRING,
  date_departure: DataTypes.DATE,
  airline: DataTypes.STRING,
  duration: DataTypes.INTEGER,
  quota: DataTypes.INTEGER,
  quota_update: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
  is_active: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'package_umroh',
});
return package_umroh;
};