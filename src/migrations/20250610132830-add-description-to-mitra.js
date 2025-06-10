'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('mitra', 'description', {
      type: Sequelize.STRING,
      allowNull: true, // ubah jadi false kalau wajib diisi
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('mitra', 'description');
  },
};
