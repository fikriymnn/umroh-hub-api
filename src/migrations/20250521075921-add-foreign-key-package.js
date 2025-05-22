'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('package_fasilities', {
      fields: ['id_package'],
      type: 'foreign key',
      name: 'fk_packageumroh_fasilities',
      references: {
        table: 'package_umroh',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('package_fasilities', 'fk_packageumroh_fasilities');
  }
};
