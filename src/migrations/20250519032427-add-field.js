'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('package_umroh', 'id_type_departure', {
      type: Sequelize.STRING,
      allowNull: false,
      // defaultValue: 'aktif',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('package_umroh', 'id_type_departure');
  }
};
