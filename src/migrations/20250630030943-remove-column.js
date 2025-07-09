'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('package_umroh', 'transportation');

    await queryInterface.addConstraint('package_transportations', {
      fields: ['id_package'],
      type: 'foreign key',
      name: 'fk_package_umroh',
      references: {
        table: 'package_umroh',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },



  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('package_umroh', 'transportation', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.removeConstraint('package_transportations', 'fk_package_umroh');
  }
};
