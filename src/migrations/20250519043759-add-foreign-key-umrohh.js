'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('package_umroh', 'id_type_departure', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addConstraint('package_umroh', {
      fields: ['id_type_departure'],
      type: 'foreign key',
      name: 'fk_packageumroh_type_departure',
      references: {
        table: 'master_type_departure',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_type_departure');
    await queryInterface.removeColumn('package_umroh', 'id_type_departure');
  }
};
