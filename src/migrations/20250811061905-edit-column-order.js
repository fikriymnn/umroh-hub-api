'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('order', 'departure_status', {
      type: Sequelize.ENUM('process', 'departure', 'arrival'),
      defaultValue: 'process',
    });

    await queryInterface.changeColumn('package_umroh', 'package_status', {
      type: Sequelize.ENUM('active', 'draft', 'checked', 'rejected', 'history', 'departure'),
      defaultValue: 'checked',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('order', 'departure_status', {
      type: Sequelize.ENUM('process', 'departure', 'arrival'),
      defaultValue: 'process',
    });

    await queryInterface.changeColumn('package_umroh', 'package_status', {
      type: Sequelize.ENUM('active', 'draft', 'checked', 'rejected', 'history', 'departure'),
      defaultValue: 'checked',
    });
  }
};
