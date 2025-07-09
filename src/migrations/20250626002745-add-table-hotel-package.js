'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('package_umroh', 'airplane', {
      type: Sequelize.STRING,
      allowNull: false,
      // defaultValue: 0
    });

    await queryInterface.addColumn('package_umroh', 'rating', {
      type: Sequelize.INTEGER,
      allowNull: false,
      // defaultValue: 0
    });

    await queryInterface.addColumn('package_umroh', 'transfortation', {
      type: Sequelize.STRING,
      allowNull: false,
      // defaultValue: 0
    });

    await queryInterface.addColumn('package_umroh', 'date_arrival', {
      type: Sequelize.STRING,
      allowNull: false,
      // defaultValue: 0
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('package_umroh', 'airplane');
    await queryInterface.removeColumn('package_umroh', 'transfortation');
    await queryInterface.removeColumn('package_umroh', 'date_arrival');
    await queryInterface.removeColumn('package_umroh', 'rating');
  }
};
