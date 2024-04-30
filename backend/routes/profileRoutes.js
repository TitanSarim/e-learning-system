const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {getUserProfile, createUpdateUserProfile, updateUserAvatar, deleteUserAvatar, PorfileChangePassword} = require('../controllers/profileController')
const {deleteUser} = require('../controllers/DeleteUserEveryThing')
const {imageUpload} = require('../middleware/imageUpload')

const router = express.Router();


router.route("/get-my-profile").get(isAuthenticatedUser, getUserProfile)

router.route("/update-my-profile").post(isAuthenticatedUser, createUpdateUserProfile)

router.route("/upload-avatar").post(isAuthenticatedUser, imageUpload.single('avatar'), updateUserAvatar)

router.route("/delete-avatar").delete(isAuthenticatedUser, deleteUserAvatar)

router.route("/change-password").post(isAuthenticatedUser, PorfileChangePassword);

router.route("/delete-profile").get(isAuthenticatedUser, deleteUser)

module.exports = router