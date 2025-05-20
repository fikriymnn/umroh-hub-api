'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addConstraint('package_umroh', {
    //   fields: ['id_category_departure'], // kolom yang jadi foreign key
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_category_departure', // nama constraint (bebas, tapi unik)
    //   references: {
    //     table: 'master_category_departure', // nama tabel yang direferensikan
    //     field: 'id',                        // kolom pada tabel tersebut
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    // await queryInterface.addConstraint('package_umroh', {
    //   fields: ['id_location_departure'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_location_departure',
    //   references: {
    //     table: 'master_category_departure',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
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
    //   fields: ['id_mitra'],
    //   type: 'foreign key',
    //   name: 'fk_packageumroh_mitra',
    //   references: {
    //     table: 'master_mitra',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
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
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_category_departure');
    // await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_type_departure');
    // await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_location_departure');
    // await queryInterface.removeConstraint('package_umroh', 'fk_packageumroh_mitra');
    // await queryInterface.removeConstraint('package_image', 'fk_packageumroh_package_image');
  }
};
