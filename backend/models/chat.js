'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chat.init({
    FromuserId: DataTypes.INTEGER,
    ToUserId: DataTypes.INTEGER,
    FromUserName: DataTypes.STRING,
    ToUserName: DataTypes.STRING,
    FromUserAvatar: DataTypes.JSON,
    toUserAvatar: DataTypes.JSON,
    jobId: DataTypes.INTEGER,
    readStatus: DataTypes.STRING,
    message: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};