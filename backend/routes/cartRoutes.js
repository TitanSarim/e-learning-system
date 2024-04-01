const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {AddToCart, GetCart, removeFromCart} = require('../controllers/CartController')


const router = express.Router();

router.route("/add-to-cart").post(isAuthenticatedUser, AddToCart);

router.route("/get-cart").get(isAuthenticatedUser, GetCart);

router.route("/remove-to-cart").delete(isAuthenticatedUser, removeFromCart);


module.exports = router