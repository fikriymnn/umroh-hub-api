'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user', // harus sesuai tableName di model User
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_mitra: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mitra', // harus sesuai tableName di model Mitra
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_package: {
        type: Sequelize.INTEGER,
        references: {
          model: 'package_umroh',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: false
      },

      subtotal: {
        type: Sequelize.INTEGER
      },
      payment_status: {
        type: Sequelize.ENUM('pending', 'paid', 'failed'),
        allowNull: false
      },
      departure_status: {
        type: Sequelize.ENUM('process', 'departure', 'arrival'),
        defaultValue: 'process',
      },
      note: {
        type: Sequelize.STRING
      },
      order_status: {
        type: Sequelize.ENUM('waiting', 'confirmed', 'cancelled'),
        allowNull: false
      },

      payment_method: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      no_rek: {
        type: Sequelize.STRING
      },
      transaction_proof_url: {
        type: Sequelize.STRING
      },
      by_name_of: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      review_status: {
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
    await queryInterface.dropTable('orders');
  }
};