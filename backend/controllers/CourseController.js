const { Course } = require('../models'); // Adjust the path based on your project structure
const bcrypt = require('bcryptjs');
const generatedToken = require("../utils/jwtToken")
const setTokenCookie = require("../utils/sendToken")
const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const {generateSlug} = require('../middleware/GenerateSlug');


// admin
const createCourse  = catchAsyncError(async (req, res, next) => {


    try {
        
        const userId = req.user.userid
        const teacherName = req.user.username
        const {courseTitle, courseCategory, courseDesc, price, tags, weeks, thumbnailUrl, videoUrls, status} = req.body;

        const slug = generateSlug(courseTitle, userId)

        const Admincourses  = await Course.create({
            teacherId: userId,
            slug: slug,
            course_title: courseTitle,
            category: courseCategory,
            tags: tags,
            timeline: weeks,
            course_desc: {desc: courseDesc},
            course_thumbnail: {
                url: thumbnailUrl,
            },
            course_content: {
                data: videoUrls
            },
            views: "0",
            price: price,
            inrolled_by: { id: ["1", "2"]},
            teacher_name: teacherName,
            comments: "0",
            reviews: "0",
            status: status
        })

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            Admincourses: Admincourses,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

// admin
const GetAllCourseAdmin  = catchAsyncError(async (req, res, next) => {


    try {

        const AdminAllcourses  = await Course.findAll();

        const Admincourses = AdminAllcourses.map(course => ({
            id: course.id || '',
            teacherId: course.teacherId || '',
            slug: course.slug || '',
            course_title: course.course_title || '',
            category: course.category || '',
            tags: course.tags || '',
            timeline: course.timeline || '',
            course_desc: course.course_desc || '',
            course_thumbnail: course.course_thumbnail.url || '',
            course_content: course.course_content || '',
            views: course.views || '',
            price: course.price || '',
            inrolled_by: course.inrolled_by || '',
            teacher_name: course.teacher_name || '',
            comments: course.comments || '',
            reviews: course.reviews || '',
            status: course.status || '',
            createdAt: course.createdAt || '',
            updatedAt: course.updatedAt || ''
          }));
          
        res.status(201).json({
            success: true,
            message: 'Course retrived successfully',
            Admincourses: Admincourses,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

module.exports = {
    createCourse,
    GetAllCourseAdmin
}