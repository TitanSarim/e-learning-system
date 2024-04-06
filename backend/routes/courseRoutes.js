const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {createCourse, UpdateCourse, GetAllCourseAdmin, GetSingleCourseAdmin, UpdateCourseStatus, deleteCourse, GetAllPublicCourses, GetSinglePublicCourse, GetSingleInrolledCourse, GetAllInrolledCourse, SaveCompletionRateOfCourse} = require('../controllers/CourseController')


const router = express.Router();

router.route("/createCourse").post(isAuthenticatedUser, createCourse);

router.route("/updateCourse/:slug").put(isAuthenticatedUser, UpdateCourse);

router.route("/updateCourseStatus/:slug").put(isAuthenticatedUser, UpdateCourseStatus)

router.route("/delete-admin-course/:slug").delete(isAuthenticatedUser, deleteCourse)

router.route("/get-all-admin-courses").get(isAuthenticatedUser, GetAllCourseAdmin)

router.route("/get-single-admin-courses/:slug").get(isAuthenticatedUser, GetSingleCourseAdmin)

// public routes
router.route('/get-all-public-courses').get(GetAllPublicCourses)

router.route('/get-single-public-course/:slug').get(GetSinglePublicCourse)

// Inrolled Student Routes
router.route('/get-all-inrolled-courses').get(isAuthenticatedUser, GetAllInrolledCourse)

router.route('/get-single-inrolled-course').post(isAuthenticatedUser, GetSingleInrolledCourse)

router.route('/save-completion-content').post(isAuthenticatedUser, SaveCompletionRateOfCourse)


module.exports = router

