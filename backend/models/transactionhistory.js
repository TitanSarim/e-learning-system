'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionHistory.init({
    userId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    payment_method: DataTypes.JSON,

  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};