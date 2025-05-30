'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Order belongs to User, Mitra, and Package
    order.belongsTo(models.User, {
  foreignKey: 'id_user',
  as: 'user'
});
order.belongsTo(models.Mitra, { // <-- sebelumnya models.mitra, ubah jadi kapital
  foreignKey: 'id_mitra',
  as: 'mitra'
});
order.belongsTo(models.package_umroh, {
  foreignKey: 'id_package',
  as: 'package_umroh'
});
    }
  }
  order.init({
    id_package: DataTypes.INTEGER,
    id_mitra: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    payment_status: DataTypes.ENUM('pending', 'paid', 'failed'),
    departure_status: DataTypes.BOOLEAN,
    order_status: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    payment_method: DataTypes.STRING,
    bank: DataTypes.STRING,
    no_rek: DataTypes.STRING,
    transaction_proof_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order',
    tableName: 'order',
     freezeTableName: true
  });

  return order;
};
