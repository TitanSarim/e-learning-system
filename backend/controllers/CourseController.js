const { Course } = require('../models'); // Adjust the path based on your project structure
const bcrypt = require('bcryptjs');
const generatedToken = require("../utils/jwtToken")
const setTokenCookie = require("../utils/sendToken")
const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const {generateSlug} = require('../middleware/GenerateSlug');

const createCourse  = catchAsyncError(async (req, res, next) => {


    try {
        
        const userId = req.user.userid

        const {courseTitle, courseCategory, courseDesc, tags, weeks, thumbnailUrl, videoUrls} = req.body;

        const slug = generateSlug(courseTitle, userId)

        const Admincourses  = await Course.create({
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
            price: "0",
            inrolled_by: { id: ["1", "2"]},
            teacher_name: "Sarim",
            comments: "0",
            reviews: "0"
        })

        console.log("course", Admincourses)
        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            Admincourses: Admincourses,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


module.exports = {
    createCourse
}