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
    avatar: DataTypes.JSON,
    location: DataTypes.STRING, 
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phoneno: DataTypes.STRING,
    Headline: DataTypes.JSON,
    about: DataTypes.JSON,
    education: DataTypes.JSON,
    skills: DataTypes.JSON,
    experience: DataTypes.JSON,
    social: DataTypes.JSON, 
    cv: DataTypes.JSON,
    coverletter: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};