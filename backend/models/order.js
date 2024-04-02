'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    course_ids: DataTypes.JSON,
    total: DataTypes.INTEGER,
    gst: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    payment_method: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};