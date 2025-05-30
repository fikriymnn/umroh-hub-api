'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.renameTable('detail_activities', 'detail_activity');
    // await queryInterface.renameColumn('detail_activity', 'description', 'note');

    // await queryInterface.addColumn('package_schedule', 'image_url', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });

    await queryInterface.addColumn('detail_activity', 'time', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('detail_activity', 'activity', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.renameTable('detail_activitiy', 'detail_activities');
    // await queryInterface.renameColumn('detail_activity', 'activity', 'note');
    // await queryInterface.removeColumn('package_schedule', 'image_url');
    await queryInterface.removeColumn('detail_activity', 'time');
    await queryInterface.removeColumn('detail_activity', 'activity');
  }
};
