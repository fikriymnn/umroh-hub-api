'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('general_facilities', {
      fields: ['id_hotel'],
      type: 'foreign key',
      name: 'fk_hoel_master',
      references: {
        table: 'master_hotel',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('reviews', 'fk_hoel_master');
  }
};
