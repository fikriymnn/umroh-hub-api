'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('package_umroh', 'transfortation', 'transportation');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('package_umroh', 'transportation', 'transfortation');
  }
};
