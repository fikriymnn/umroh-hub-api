'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('master_hotel', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true, // ubah jadi false kalau wajib diisi
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('master_hotel', 'image_url');
  },
};
