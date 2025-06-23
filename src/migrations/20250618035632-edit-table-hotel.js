'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('master_hotel', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
      // defaultValue: 0
    });

    await queryInterface.removeColumn('package_hotel', 'description');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('package_umroh', 'description');

    await queryInterface.addColumn('package_hotel', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
