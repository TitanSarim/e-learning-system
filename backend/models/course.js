'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    slug: DataTypes.JSON,
    course_title: DataTypes.STRING,
    category: DataTypes.STRING,
    tags: DataTypes.STRING,
    timeline: DataTypes.STRING,
    course_desc: DataTypes.JSON,
    course_thumbnail: DataTypes.JSON,
    course_content: DataTypes.JSON,
    views: DataTypes.STRING,
    price: DataTypes.STRING,
    inrolled_by: DataTypes.JSON,
    teacher_name: DataTypes.STRING,
    comments: DataTypes.JSON,
    reviews: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};