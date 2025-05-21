'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.changeColumn('master_locations', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true,
    // });
    // await queryInterface.changeColumn('master_type_departures', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true,
    // });
    // await queryInterface.changeColumn('master_category_departures', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true,
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
