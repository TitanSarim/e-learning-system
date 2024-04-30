'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    loginToken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};


// INSERT INTO Users (username, role, email, age, gender, password, status, loginToken, createdAt, updatedAt) 
// VALUES ('admin', 'admin', 'admin', 25, 'Male', '$2a$10$ftUpomf4Cbr7gNQs1xj42ed59b9UwvbMvVwsrAkSRpC76KfhwiQtq', 'active', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTQwNzQ4MjIsImV4cCI6MTcxNDY3OTYyMn0.-vOUvwzyaz8JCeWzbLN-MKuYjcwe-87nf41fXdreyfc', '2024-03-20 12:41:11', '2024-03-20 12:41:11');