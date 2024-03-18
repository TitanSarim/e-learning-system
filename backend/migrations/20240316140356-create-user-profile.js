'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      firstname:{
        type: Sequelize.STRING
      },
      lastname:{
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.JSON
      },
      tagline: {
        type: Sequelize.JSON
      },
      about:{
        type: Sequelize.JSON
      },
      experience:{
        type: Sequelize.JSON
      },
      education:{
        type: Sequelize.JSON
      },
      skills:{
        type: Sequelize.JSON
      },
      social:{
        type: Sequelize.JSON
      },
      certificates:{
        type: Sequelize.JSON
      },
      cv:{
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
    await queryInterface.dropTable('UserProfiles');
  }
};