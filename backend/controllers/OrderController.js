const { Op } = require('sequelize');
const {Order, TransactionHistory} = require("../models"); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const StripeController = catchAsyncError(async (req, res, next) => {

    try {
        const userId = req.user.userid
        const {course_ids, total_amount} = req.body

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total_amount * 100,
            currency: 'usd',
            metadata: {
                userId: userId,
                courseIds: course_ids.join(','),
            },
        });

        res.status(201).json({
            success: true,
            message: 'Order Completed successfully',
            client_secret: paymentIntent.client_secret,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const OrderController = catchAsyncError(async (req, res, next) => {

    try {
        const userId = req.user.userid
        const {course_ids, total, gst, total_amount, fullName, payment_method} = req.body

        const orderObject = await Order.create({
            userId: userId,
            course_ids: course_ids,
            total: total,
            gst: gst,
            total_amount: total_amount,
            payment_method: payment_method,
        });

        const transctionHistory = await TransactionHistory.create({
            userId: userId,
            orderId: orderObject.id,
            total_amount: total_amount,
            card_number: 12312313,
            isSucceeded: true
        })

        const order = {
            orderObject: orderObject,
            transctionHistory: transctionHistory
        }

        res.status(201).json({
            success: true,
            message: 'Order Completed successfully',
            order: order,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

module.exports = {
    OrderController,
    StripeController
}