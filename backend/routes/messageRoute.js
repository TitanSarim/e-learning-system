const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const { sendJobMessage, sendJobMessageJobSeeker, getJobMessages, getJobMessagesJobSeeker} = require('../controllers/MessageController')

const router = express.Router();

router.route("/send-job-message").post(isAuthenticatedUser, sendJobMessage);

router.route("/send-job-seeker-message").post(isAuthenticatedUser, sendJobMessageJobSeeker);

router.route("/get-job-messages").get(isAuthenticatedUser, getJobMessages);

router.route("/get-job-seeker-messages").get(isAuthenticatedUser, getJobMessagesJobSeeker);

module.exports = router