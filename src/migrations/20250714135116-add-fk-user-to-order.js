'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('order', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'fk_order_user', // nama constraint bebas, tapi harus unik
      references: {
        table: 'user',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' // atau CASCADE, tergantung kebutuhan
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('order', 'fk_order_user');
  }
};
