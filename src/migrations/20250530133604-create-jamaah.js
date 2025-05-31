'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jamaah', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     id_order: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'orders',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},

      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
     gender: {
  type: Sequelize.ENUM('male', 'female'),
  allowNull: false
},

      phone_number: {
        type: Sequelize.STRING
      },
      ktp_url: {
        type: Sequelize.STRING
      },
      kk_url: {
        type: Sequelize.STRING
      },
      passport_url: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jamaah');
  }
};