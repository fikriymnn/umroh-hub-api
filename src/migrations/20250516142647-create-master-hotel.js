'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_hotel', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mitra: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      hotel_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      room_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hotel_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
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

    // Constraint FK ke hotel_facilities bisa dibuat di migration terpisah setelah ini
    // jika tabel hotel_facilities belum ada saat ini
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_hotel');
  }
};
