'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      review_image.belongsTo(models.review, {
        foreignKey: 'id_review',
        // as: 'review'
      });
    }
  }
  review_image.init({
    id_review: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'review_image',
    tableName: 'review_image'
  });
  return review_image;
};