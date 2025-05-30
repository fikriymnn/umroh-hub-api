'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addConstraint('package_umroh', {
    //   fields: ['id_type_departure'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_type_departure',
    //   references: {
    //     table: 'master_type_departure',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    // await queryInterface.addConstraint('package_umroh', {
    //   fields: ['id_category_departure'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_category_departure',
    //   references: {
    //     table: 'master_category_departure',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    await queryInterface.renameColumn('package_umroh', 'is_location_departure', 'id_location_departure');
    await queryInterface.addConstraint('package_umroh', {
      fields: ['id_location_departure'],
      type: 'foreign key',
      name: 'fk_packageumroh_location_departure',
      references: {
        table: 'master_location_departure',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addConstraint('package_umroh', {
      fields: ['id_mitra'],
      type: 'foreign key',
      name: 'fk_packageumroh_mitra',
      references: {
        table: 'mitra',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    // await queryInterface.addConstraint('package_image', {
    //   fields: ['id_package'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_package_image',
    //   references: {
    //     table: 'package_umroh',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    // await queryInterface.addConstraint('package_hotel', {
    //   fields: ['id_hotel'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_hotel',
    //   references: {
    //     table: 'master_hotel',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    // await queryInterface.addConstraint('package_hotel', {
    //   fields: ['id_package'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_packageHotel',
    //   references: {
    //     table: 'package_umroh',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    // await queryInterface.addConstraint('package_schedule', {
    //   fields: ['id_package'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh',
    //   references: {
    //     table: 'package_umroh',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    // await queryInterface.addConstraint('detail_activity', {
    //   fields: ['id_schedule'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_schedule',
    //   references: {
    //     table: 'package_schedule',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('package_umroh', 'id_location_departure', 'is_location_departure');
    // await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_category_departure');
    // await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_type_departure');
    await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_location_departure');
    await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_mitra');
    // await queryInterface.removeConstraint('package_image', 'fk_packageumroh_package_image');
    // await queryInterface.removeConstraint('package_hotel', 'fk_packageumroh_hotel');
    // await queryInterface.removeConstraint('package_hotel', 'fk_packageumroh_packageHotel');
    // await queryInterface.removeConstraint('package_schedule', 'fk_packageumroh');
    // await queryInterface.removeConstraint('detail_activity', 'fk_packageumroh_schedule');
  }
};
