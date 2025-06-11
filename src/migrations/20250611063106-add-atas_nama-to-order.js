'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'by_name_of', {
      type: Sequelize.STRING,
      allowNull: true, // ubah jadi false kalau wajib diisi
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'by_name_of');
  },
};
