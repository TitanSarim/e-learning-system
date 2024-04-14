'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      slug: {
        type: Sequelize.TEXT
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      education:{
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      skillLevel: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.INTEGER
      },
      jobDesc: {
        type: Sequelize.JSON
      },
      country: {
        type: Sequelize.JSON
      },
      state: {
        type: Sequelize.JSON
      },
      city: {
        type: Sequelize.JSON
      },
      status: {
        type: Sequelize.STRING
      },
      Applications: {
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
    await queryInterface.dropTable('Jobs');
  }
};