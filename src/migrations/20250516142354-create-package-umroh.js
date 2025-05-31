'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('package_umroh', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mitra: {
        type: Sequelize.INTEGER
      },
      id_location_departure: {
        type: Sequelize.INTEGER
      },
      id_category_departure: {
        type: Sequelize.INTEGER
      },
      package_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      date_departure: {
        type: Sequelize.DATE
      },
      airline: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      quota: {
        type: Sequelize.INTEGER
      },
      quota_update: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      id_type_departure: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('package_umroh');
  }
};