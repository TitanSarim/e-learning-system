const { Op } = require('sequelize');
const { Cart, Course, WishList } = require("../models"); // Adjust the path based on your project structure
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");


const AddToCart = catchAsyncError(async (req, res, next) => {

    try {

        const userId = req.user.userid
        const {slug} = req.body

        const existingCartEntry = await Cart.findOne({ where: {userId: userId, slug: slug} })

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
            attributes: ['id', 'slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
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
        console.log("userId", userId)

        const cartItems = await Cart.findAll({where: {userId: userId}})

        const slugs = cartItems.map(cartItem => cartItem.slug);

        const cart = await Course.findAll({
            where: {
                slug: {
                    [Op.in]: slugs 
                }
            },
            attributes: ['id', 'slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
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

        await Cart.destroy({ where: {userId: userId, slug: slug}})

        const cartItems = await Cart.findAll({where: {userId: userId}})

        const slugs = cartItems.map(cartItem => cartItem.slug);

        const cart = await Course.findAll({
            where: {
                slug: {
                    [Op.in]: slugs 
                }
            },
            attributes: ['id', 'slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
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


// wishlist
const AddToWishList = catchAsyncError(async (req, res, next) => {

    try {

        const userId = req.user.userid
        const {slug} = req.body

        const existingWishListEntry = await WishList.findOne({ where: {userId: userId, slug: slug} })

        if (existingWishListEntry) {
            return res.status(400).json({
                success: false,
                message: 'Course already in the Wishlist'
            });
        }

        await WishList.create({
            userId: userId,
            slug: slug
        })

        const WishListItems = await WishList.findAll({
            where: {userId: userId},
        })

        const slugs = WishListItems.map(cartItem => cartItem.slug);

        const wishList = await Course.findAll({
            where: {
                slug: {
                    [Op.in]: slugs 
                }
            },
            attributes: ['id', 'slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
        });

        res.status(201).json({
            success: true,
            message: 'WishList updated',
            wishList: wishList
          });
          
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const GetWishList = catchAsyncError(async (req, res, next) => {

    try {

        const userId = req.user.userid

        const wishListItems = await WishList.findAll({where: {userId: userId}})

        const slugs = wishListItems.map(cartItem => cartItem.slug);

        const wishList = await Course.findAll({
            where: {
                slug: {
                    [Op.in]: slugs 
                }
            },
            attributes: ['id', 'slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
        });

        res.status(201).json({
            success: true,
            message: 'Cart retrived successfully',
            wishList: wishList
          });
          
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const removeFromWishList = catchAsyncError(async (req, res, next) => {

    try {
        const userId = req.user.userid
        const slug = req.params.slug

        await WishList.destroy({ where: {userId: userId, slug: slug}})

        const wishListItems = await WishList.findAll({where: {userId: userId}})

        const slugs = wishListItems.map(cartItem => cartItem.slug);

        const wishList = await Course.findAll({
            where: {
                slug: {
                    [Op.in]: slugs 
                }
            },
            attributes: ['id', 'slug', 'course_title', 'teacher_name', 'price', 'course_thumbnail']
        });

        res.status(201).json({
            success: true,
            message: 'wishList retrived successfully',
            wishList: wishList
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})
module.exports = {
    AddToCart,
    GetCart,
    removeFromCart,
    AddToWishList,
    GetWishList,
    removeFromWishList
}