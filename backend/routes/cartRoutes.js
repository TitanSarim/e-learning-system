const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {AddToCart, GetCart, removeFromCart, AddToWishList, GetWishList, removeFromWishList} = require('../controllers/CartController')


const router = express.Router();

router.route("/add-to-cart").post(isAuthenticatedUser, AddToCart);

router.route("/get-cart").get(isAuthenticatedUser, GetCart);

router.route("/remove-to-cart/:slug").delete(isAuthenticatedUser, removeFromCart);


router.route("/add-to-wishlist").post(isAuthenticatedUser, AddToWishList);

router.route("/get-wishlist").get(isAuthenticatedUser, GetWishList);

router.route("/remove-to-wishlist/:slug").delete(isAuthenticatedUser, removeFromWishList);


module.exports = router