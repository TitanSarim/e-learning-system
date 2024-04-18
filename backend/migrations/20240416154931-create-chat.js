'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FromuserId:{
        type: Sequelize.INTEGER
      },
      ToUserId: {
        type: Sequelize.INTEGER
      },
      FromUserName: {
        type: Sequelize.STRING
      },
      ToUserName: {
        type: Sequelize.STRING
      },
      FromUserAvatar:{
        type: Sequelize.JSON
      },
      toUserAvatar:{
        type: Sequelize.JSON
      },
      jobId: {
        type: Sequelize.INTEGER
      },
      readStatus: {
        type: Sequelize.STRING
      },
      message: {
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
    await queryInterface.dropTable('chats');
  }
};