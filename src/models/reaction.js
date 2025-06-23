'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reaction.belongsTo(models.Post, { foreignKey: 'postId' });
      reaction.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  reaction.init({
    type: DataTypes.ENUM('like', 'love', 'haha', 'wow', 'sad', 'angry'),
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reaction',
  });

  return reaction;
};
