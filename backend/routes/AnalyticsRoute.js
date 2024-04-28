const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const { getAnalytics } = require('../controllers/AdminAnalyticsController');

const router = express.Router();

router.route("/get-analytics").get(isAuthenticatedUser, getAnalytics);


module.exports = router