'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slug:{
        type: Sequelize.JSON
      },
      course_title: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      timeline: {
        type: Sequelize.STRING
      },
      course_desc: {
        type: Sequelize.JSON
      },
      course_thumbnail: {
        type: Sequelize.JSON
      },
      course_content: {
        type: Sequelize.JSON
      },
      views:{
        type: Sequelize.STRING
      },
      price:{
        type: Sequelize.STRING
      },
      inrolled_by:{
        type: Sequelize.JSON
      },
      teacher_name:{
        type: Sequelize.STRING
      },
      comments:{
        type: Sequelize.JSON
      },
      reviews:{
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};