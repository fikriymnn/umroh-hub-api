'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('master_category_departures', 'master_category_departure');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('master_category_departure', 'master_category_departures');
  }
};
