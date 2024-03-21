const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {getUserProfile, createUpdateUserProfile} = require('../controllers/profileController')


const router = express.Router();


router.route("/get-my-profile").get(isAuthenticatedUser, getUserProfile)

router.route("/update-my-profile").post(isAuthenticatedUser, createUpdateUserProfile)



module.exports = router