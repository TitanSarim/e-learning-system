const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {createCourse} = require('../controllers/CourseController')
const {imageUpload} = require('../middleware/imageUpload')

const router = express.Router();


router.route("/createCourse").post(imageUpload.single('thumbnailFile'), createCourse, isAuthenticatedUser)

module.exports = router