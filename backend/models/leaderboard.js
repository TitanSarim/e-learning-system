'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaderBoard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LeaderBoard.init({
    userId: DataTypes.INTEGER,
    slug: DataTypes.TEXT,
    completion_content: DataTypes.JSON,
    completion_rate: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'LeaderBoard',
  });
  return LeaderBoard;
};