'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mitras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      compamy_name: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      nib: {
        type: Sequelize.STRING
      },
      npwp: {
        type: Sequelize.STRING
      },
      siup: {
        type: Sequelize.STRING
      },
      siuppiu: {
        type: Sequelize.STRING
      },
      akta: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Mitras');
  }
};