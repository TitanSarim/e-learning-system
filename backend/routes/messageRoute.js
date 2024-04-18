const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const { sendJobMessage, getJobMessages} = require('../controllers/MessageController')

const router = express.Router();

router.route("/send-job-message").post(isAuthenticatedUser, sendJobMessage);

router.route("/get-job-messages").get(isAuthenticatedUser, getJobMessages);

module.exports = router