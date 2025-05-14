'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mitra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mitra.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    compamy_name: DataTypes.STRING,
    website: DataTypes.STRING,
    nib: DataTypes.STRING,
    npwp: DataTypes.STRING,
    siup: DataTypes.STRING,
    siuppiu: DataTypes.STRING,
    akta: DataTypes.STRING,
    image_url: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Mitra',
  });
  return Mitra;
};