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
      actual_departure_date: {
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
      jamaah_requirements: {
        type: Sequelize.STRING
      },
      admin_note: {
        type: Sequelize.STRING
      },
      view_package: {
        type: Sequelize.INTEGER
      },
      package_status: {
        type: Sequelize.ENUM('active', 'draft', 'checked', 'rejected', 'history', 'departure'),
        defaultValue: 'checked',
      },
      airplane: {
        type: Sequelize.STRING
      },
      date_arrival: {
        type: Sequelize.DATE
      },
      rating: {
        type: Sequelize.INTEGER
      },
      departure_status: {
        type: Sequelize.ENUM('process', 'departure', 'arrival'),
        defaultValue: 'process',
      },
      konfirmation_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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