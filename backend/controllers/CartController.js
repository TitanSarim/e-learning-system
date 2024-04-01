const { Op } = require('sequelize');
const { Cart, Course } = require("../models"); // Adjust the path based on your project structure
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");


const AddToCart = catchAsyncError(async (req, res, next) => {

    try {

        const userId = req.user.userid
        const {slug} = req.body

        const existingCartEntry = await Cart.findOne({ where: {userId: userId, slug: slug} })

        console.log("existingCartEntry", existingCartEntry)

        if (existingCartEntry) {
            return res.status(400).json({
                success: false,
                message: 'Course already in the cart'
            });
        }

        await Cart.create({
            userId: userId,
            slug: slug
        })

        const cartItems = await Cart.findAll({
            where: {userId: userId},
        })

        const slugs = cartItems.map(cartItem => cartItem.slug);

        const cart = await Course.findAll({
            where: {
                slug: {
                    [Op.in]: slugs 
                }
            },
            attributes: ['slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
        });

        res.status(201).json({
            success: true,
            message: 'Cart updated',
            cart: cart
          });
          
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const GetCart = catchAsyncError(async (req, res, next) => {

    try {

        const userId = req.user.userid

        const cartItems = await Cart.findAll({where: {userId: userId}})

        const slugs = cartItems.map(cartItem => cartItem.slug);

        const cart = await Course.findAll({
            where: {
                slug: {
                    [Op.in]: slugs 
                }
            },
            attributes: ['slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
        });

        res.status(201).json({
            success: true,
            message: 'Cart retrived successfully',
            cart: cart
          });
          
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const removeFromCart = catchAsyncError(async (req, res, next) => {

    try {
        const userId = req.user.userid
        const slug = req.params.slug

        console.log("userId", userId)
        await Cart.destroy({ where: {userId: userId, slug: slug}})

        const cart = await Course.findAll({
            where: {
                userId: userId 
            },
            attributes: ['slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
        });

        res.status(201).json({
            success: true,
            message: 'Cart retrived successfully',
            cart: cart
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

module.exports = {
    AddToCart,
    GetCart,
    removeFromCart
}