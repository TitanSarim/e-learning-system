'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Jobs.init({
    userId: DataTypes.INTEGER,
    slug: DataTypes.TEXT,
    jobTitle: DataTypes.STRING,
    company: DataTypes.STRING,
    education: DataTypes.STRING,
    category: DataTypes.STRING,
    skillLevel: DataTypes.STRING,
    duration: DataTypes.STRING,
    type: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    jobDesc: DataTypes.JSON,
    country: DataTypes.JSON, 
    state: DataTypes.JSON,
    city: DataTypes.JSON,
    status: DataTypes.STRING,
    Applications: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Jobs',
  });



  return Jobs;
};