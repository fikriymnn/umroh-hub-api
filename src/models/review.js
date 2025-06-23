'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      review.belongsTo(models.package_umroh, {
        foreignKey: 'id_package',
      });
      review.belongsTo(models.order, {
        foreignKey: 'id_order',
      });
      review.belongsTo(models.User, {
        foreignKey: 'id_user',
      });
      review.hasMany(models.review_image, {
        foreignKey: 'id_review',
        // as: 'images'
      });
    }
  }
  review.init({
    id_package: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    description: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'review',
    tableName: 'review'
  });
  return review;
};