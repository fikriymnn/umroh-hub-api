'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('package_umroh', 'package_status', {
      type: Sequelize.ENUM('active', 'draft', 'checked', 'rejected', 'history'),
      allowNull: false,
      defaultValue: 'checked'
    });
    await queryInterface.addColumn('package_umroh', 'admin_note', {
      type: Sequelize.STRING,
      allowNull: true,
      // defaultValue: false
    });
    await queryInterface.addColumn('package_umroh', 'jamaah_requirements', {
      type: Sequelize.STRING,
      allowNull: false,
      // defaultValue: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('package_umroh', 'package_status');
    await queryInterface.removeColumn('package_umroh', 'admin_note');
    await queryInterface.removeColumn('package_umroh', 'jamaah_requirements');
  }
};
