const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {createCourse, GetAllCourseAdmin, GetSingleCourseAdmin} = require('../controllers/CourseController')


const router = express.Router();

router.route("/createCourse").post(isAuthenticatedUser, createCourse);

router.route("/get-all-admin-courses").get(isAuthenticatedUser, GetAllCourseAdmin)

router.route("/get-single-admin-courses/:slug").get(isAuthenticatedUser, GetSingleCourseAdmin)

module.exports = router


// imageUpload.single('thumbnailFile'), 

// filesUpload.fields([{
//     name: "videoFile",
//     maxCount: 100,
// }]),
