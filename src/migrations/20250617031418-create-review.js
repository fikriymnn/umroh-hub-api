'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_package: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'package_umroh',
          key: 'id'
        },
      },
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'order',
          key: 'id'
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      description: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('review');
  }
};