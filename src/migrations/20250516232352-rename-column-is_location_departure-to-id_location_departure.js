'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // // await queryInterface.renameColumn('package_umrohs', 'is_location_departure', 'id_location_departure');
    // await queryInterface.renameTable('package_umroh', 'package_umroh');
    // await queryInterface.renameTable('package_image', 'package_image');
    // // await queryInterface.renameTable('master_hotels', 'master_hotel');
    // // await queryInterface.renameTable('master_type_departures', 'master_type_departure');
    // // await queryInterface.renameTable('master_locations', 'master_location');
    // // await queryInterface.changeColumn('package_umroh', 'is_active', {
    // //   type: Sequelize.BOOLEAN,
    // //   allowNull: false,
    // //   defaultValue: true
    // // });
    // await queryInterface.changeColumn('package_umroh', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // });
    // await queryInterface.changeColumn('package_image', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // });
    // await queryInterface.changeColumn('master_hotel', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // });
    // await queryInterface.changeColumn('master_category_departure', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // });
    // await queryInterface.changeColumn('master_type_departure', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // });
    // await queryInterface.changeColumn('master_location', 'is_active', {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // });
  },

  async down(queryInterface, Sequelize) {
    // // await queryInterface.renameColumn('package_umrohs', 'id_location_departure', 'is_location_departure');
    // await queryInterface.renameTable('package_umroh', 'packages_umroh');
    // await queryInterface.renameTable('package_image', 'packages_image');
    // // await queryInterface.renameTable('master_type_departure', 'master_type_departures');
    // // await queryInterface.renameTable('master_location', 'master_locations');
    // // await queryInterface.renameTable('master_hotel', 'master_hotels');
    // await queryInterface.changeColumn('package_umroh', 'is_active', {
    //   type: Sequelize.TINYINT,
    //   allowNull: false,
    //   defaultValue: 1
    // });
    // await queryInterface.changeColumn('package_image', 'is_active', {
    //   type: Sequelize.TINYINT,
    //   allowNull: false,
    //   defaultValue: 1
    // });
    // await queryInterface.changeColumn('master_hotel', 'is_active', {
    //   type: Sequelize.TINYINT,
    //   allowNull: false,
    //   defaultValue: 1
    // });
    // await queryInterface.changeColumn('master_category_departure', 'is_active', {
    //   type: Sequelize.TINYINT,
    //   allowNull: false,
    //   defaultValue: 1
    // });
    // await queryInterface.changeColumn('master_type_departure', 'is_active', {
    //   type: Sequelize.TINYINT,
    //   allowNull: false,
    //   defaultValue: 1
    // });
    // await queryInterface.changeColumn('master_location', 'is_active', {
    //   type: Sequelize.TINYINT,
    //   allowNull: false,
    //   defaultValue: 1
    // });
  }
};
