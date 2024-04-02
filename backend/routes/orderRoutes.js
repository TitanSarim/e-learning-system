const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {OrderController, StripeController} = require('../controllers/OrderController')

const router = express.Router();

router.route("/make-order").post(isAuthenticatedUser, OrderController);
router.route("/stripe-key").post(isAuthenticatedUser, StripeController);


module.exports = router
