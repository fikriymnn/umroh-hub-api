'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('jamaah', 'visa_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('jamaah', 'airplane_ticket', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('jamaah', 'hotel_ticket', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('jamaah', 'visa_url');
    await queryInterface.removeColumn('jamaah', 'airplane_ticket');
    await queryInterface.removeColumn('jamaah', 'hotel_ticket');
  }
};
