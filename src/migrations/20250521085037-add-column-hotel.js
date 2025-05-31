'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addConstraint('hotel_facilities', {
    //   fields: ['id_hotel'],
    //   type: 'foreign key',
    //   name: 'fk_hotel_facilities',
    //   references: {
    //     table: 'master_hotel',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });

    // await queryInterface.addColumn('master_hotel', 'image_url', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });

    // await queryInterface.addColumn('master_hotel', 'hotel_name', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });

    // await queryInterface.addColumn('master_hotel', 'hotel_type', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });

    // await queryInterface.addColumn('master_hotel', 'room_type', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });

    // await queryInterface.addColumn('master_hotel', 'address', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('hotel_facilities', 'fk_hotel_facilities');
    // await queryInterface.removeColumn('master_hotel', 'hotel_name');
    // await queryInterface.removeColumn('master_hotel', 'hotel_type');
    // await queryInterface.removeColumn('master_hotel', 'room_type');
    // await queryInterface.removeColumn('master_hotel', 'address');
  }
};
