'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('package_umroh', 'departure_status', {
      type: Sequelize.ENUM('process', 'departure', 'arrival'),
      defaultValue: 'process',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('package_umroh', 'departure_status', {
      type: Sequelize.ENUM('process', 'departure', 'arrival'),
      defaultValue: 'process',
    });
  }
};
