'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('orders', 'order');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('order', 'orders');
  }
};
