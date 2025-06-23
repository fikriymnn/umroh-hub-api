'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('order', 'by_name_of', {
      type: Sequelize.STRING,
      allowNull: true, // ubah jadi false kalau wajib diisi
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('order', 'by_name_of');
  },
};
