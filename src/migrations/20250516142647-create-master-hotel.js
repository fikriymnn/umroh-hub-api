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
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      room_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Jika kamu ingin menambahkan image_url juga, tinggal uncomment ini:
      // image_url: {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // },
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
