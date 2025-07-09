'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reply_comments', 'parent_reply_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'reply_comments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('reply_comments', 'parent_reply_id');
  }
};
