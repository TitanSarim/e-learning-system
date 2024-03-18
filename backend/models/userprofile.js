'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserProfile.init({
    userId: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    avatar: DataTypes.JSON,
    tagline: DataTypes.JSON,
    about: DataTypes.JSON,
    experience: DataTypes.JSON,
    education: DataTypes.JSON,
    skills: DataTypes.JSON,
    social: DataTypes.JSON,
    certificates: DataTypes.JSON,
    cv: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};