'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('reviews', {
      fields: ['id_package'],
      type: 'foreign key',
      name: 'fk_packageumroh_review',
      references: {
        table: 'package_umroh',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addConstraint('reviews', {
      fields: ['id_order'],
      type: 'foreign key',
      name: 'fk_order',
      references: {
        table: 'order',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addConstraint('reviews', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'fk_user',
      references: {
        table: 'user',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addConstraint('review_images', {
      fields: ['id_review'],
      type: 'foreign key',
      name: 'fk_review',
      references: {
        table: 'reviews',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.renameTable('reviews', 'reviews');
    await queryInterface.renameTable('review_images', 'review_image');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('reviews', 'fk_packageumroh_review');
    await queryInterface.removeConstraint('reviews', 'fk_order');
    await queryInterface.removeConstraint('reviews', 'fk_user');
    await queryInterface.removeConstraint('review_images', 'fk_review');
    await queryInterface.renameTable('reviews', 'reviews');
    await queryInterface.renameTable('review_image', 'review_images');
  }
};
