const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {createCourse, UpdateCourse, GetAllCourseAdmin, GetSingleCourseAdmin, UpdateCourseStatus, deleteCourse} = require('../controllers/CourseController')


const router = express.Router();

router.route("/createCourse").post(isAuthenticatedUser, createCourse);

router.route("/updateCourse/:slug").put(isAuthenticatedUser, UpdateCourse);

router.route("/updateCourseStatus/:slug").put(isAuthenticatedUser, UpdateCourseStatus)

router.route("/delete-admin-course/:slug").delete(isAuthenticatedUser, deleteCourse)

router.route("/get-all-admin-courses").get(isAuthenticatedUser, GetAllCourseAdmin)

router.route("/get-single-admin-courses/:slug").get(isAuthenticatedUser, GetSingleCourseAdmin)


module.exports = router


// imageUpload.single('thumbnailFile'), 

// filesUpload.fields([{
//     name: "videoFile",
//     maxCount: 100,
// }]),
