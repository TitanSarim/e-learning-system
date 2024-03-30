const { Course } = require("../models"); // Adjust the path based on your project structure
const bcrypt = require("bcryptjs");
const generatedToken = require("../utils/jwtToken");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { generateSlug } = require("../middleware/GenerateSlug");


// admin
const createCourse  = catchAsyncError(async (req, res, next) => {

    try {
        
        const userId = req.user.userid
        const teacherName = req.user.username
        const {courseTitle, courseCategory, courseDesc, price, language, level, hours, tags, weeks, thumbnailUrl, videoUrls, status} = req.body;

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
            language:language,
            level:level,
            hours:hours,
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
const UpdateCourse  = catchAsyncError(async (req, res, next) => {

    try {
        const CourseUrlslug = req.params.slug;

        const userId = req.user.userid
        const teacherName = req.user.username
        const {courseTitle, courseCategory, courseDesc, price, language, level, hours, tags, weeks, thumbnailUrl, videoUrls, status} = req.body;

        const slug = generateSlug(courseTitle, userId)

        const updatedCourses  = await Course.update({
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
            language:language,
            level:level,
            hours:hours,
            inrolled_by: { id: ["1", "2"]},
            teacher_name: teacherName,
            comments: "0",
            reviews: "0",
            status: status
        }, {where: {slug: CourseUrlslug}})

        const AdminSinglecourses  = await Course.findOne({ where: { slug: slug } });

        const Admincourses = {
            id: AdminSinglecourses.id || '',
            teacherId: AdminSinglecourses.teacherId || '',
            slug: AdminSinglecourses.slug || '',
            course_title: AdminSinglecourses.course_title || '',
            category: AdminSinglecourses.category || '',
            tags: AdminSinglecourses.tags || '',
            timeline: AdminSinglecourses.timeline || '',
            course_desc: AdminSinglecourses.course_desc.desc || '',
            course_thumbnail: AdminSinglecourses.course_thumbnail.url || '',
            course_content: AdminSinglecourses.course_content.data || '',
            views: AdminSinglecourses.views || '',
            price: AdminSinglecourses.price || '',
            language: AdminSinglecourses.language || '',
            level: AdminSinglecourses.level || '',
            hours: AdminSinglecourses.hours || '',
            inrolled_by: AdminSinglecourses.inrolled_by || '',
            teacher_name: AdminSinglecourses.teacher_name || '',
            comments: AdminSinglecourses.comments || '',
            reviews: AdminSinglecourses.reviews || '',
            status: AdminSinglecourses.status || '',
            createdAt: AdminSinglecourses.createdAt || '',
            updatedAt: AdminSinglecourses.updatedAt || ''
          };

        res.status(201).json({
            success: true,
            message: 'Course Updated successfully',
            Admincourses: Admincourses,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

// admin course status
const UpdateCourseStatus  = catchAsyncError(async (req, res, next) => {

    try {
        const CourseUrlslug = req.params.slug;
        const {status} = req.body;

        console.log("status", CourseUrlslug)

        const updatedCoursesStatus  = await Course.update(
            {status: status}, 
            {where: {slug: CourseUrlslug}}
        )

        const AdminSinglecourses  = await Course.findOne({ where: { slug: CourseUrlslug } });

        const Admincourses = {
            id: AdminSinglecourses.id || '',
            teacherId: AdminSinglecourses.teacherId || '',
            slug: AdminSinglecourses.slug || '',
            course_title: AdminSinglecourses.course_title || '',
            category: AdminSinglecourses.category || '',
            tags: AdminSinglecourses.tags || '',
            timeline: AdminSinglecourses.timeline || '',
            course_desc: AdminSinglecourses.course_desc.desc || '',
            course_thumbnail: AdminSinglecourses.course_thumbnail.url || '',
            course_content: AdminSinglecourses.course_content.data || '',
            views: AdminSinglecourses.views || '',
            price: AdminSinglecourses.price || '',
            language: AdminSinglecourses.language || '',
            level: AdminSinglecourses.level || '',
            hours: AdminSinglecourses.hours || '',
            inrolled_by: AdminSinglecourses.inrolled_by || '',
            teacher_name: AdminSinglecourses.teacher_name || '',
            comments: AdminSinglecourses.comments || '',
            reviews: AdminSinglecourses.reviews || '',
            status: AdminSinglecourses.status || '',
            createdAt: AdminSinglecourses.createdAt || '',
            updatedAt: AdminSinglecourses.updatedAt || ''
          };

        res.status(201).json({
            success: true,
            message: 'Course Updated successfully',
            Admincourses: Admincourses,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

// admin delete course
const deleteCourse = catchAsyncError(async (req, res, next) => {

    try {

        const slug = req.params.slug

        await Course.destroy({where: {slug: slug}});

        res.status(201).json({
            success: true,
            message: 'Course deleted successfully',
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
            language: course.language || '',
            level: course.level || '',
            hours: course.hours || '',
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

// admin
const GetSingleCourseAdmin  = catchAsyncError(async (req, res, next) => {

    const slug = req.params.slug;

    console.log("slug", slug)

    try {

        const AdminSinglecourses  = await Course.findOne({ where: { slug: slug } });;

        if (!AdminSinglecourses) {
            return res.status(404).json({ error: "Course not found" });
        }

        const AdminSinglecourse = {
            id: AdminSinglecourses.id || '',
            teacherId: AdminSinglecourses.teacherId || '',
            slug: AdminSinglecourses.slug || '',
            course_title: AdminSinglecourses.course_title || '',
            category: AdminSinglecourses.category || '',
            tags: AdminSinglecourses.tags || '',
            timeline: AdminSinglecourses.timeline || '',
            course_desc: AdminSinglecourses.course_desc.desc || '',
            course_thumbnail: AdminSinglecourses.course_thumbnail.url || '',
            course_content: AdminSinglecourses.course_content.data || '',
            views: AdminSinglecourses.views || '',
            price: AdminSinglecourses.price || '',
            language: AdminSinglecourses.language || '',
            level: AdminSinglecourses.level || '',
            hours: AdminSinglecourses.hours || '',
            inrolled_by: AdminSinglecourses.inrolled_by || '',
            teacher_name: AdminSinglecourses.teacher_name || '',
            comments: AdminSinglecourses.comments || '',
            reviews: AdminSinglecourses.reviews || '',
            status: AdminSinglecourses.status || '',
            createdAt: AdminSinglecourses.createdAt || '',
            updatedAt: AdminSinglecourses.updatedAt || ''
          };
          
        res.status(201).json({
            success: true,
            message: 'Course retrived successfully',
            AdminSinglecourse: AdminSinglecourse,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


// Public All Courses
const GetAllPublicCourses  = catchAsyncError(async (req, res, next) => {


    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 4; // Default limit 10

        const skip = (page - 1) * limit;


        const totalCount = await Course.count();

        const allPublicCourses = await Course.findAll({
            offset: skip,
            limit: limit
        });

        const totalPages = Math.ceil(totalCount / limit);

        const pagination = {
            totalPages: totalPages,
            currentPage: page,
            totalCourses: totalCount
        };
        

        const PubliccoursesObject = allPublicCourses.map(course => ({
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
            language: course.language || '',
            level: course.level || '',
            hours: course.hours || '',
            inrolled_by: course.inrolled_by || '',
            teacher_name: course.teacher_name || '',
            comments: course.comments || '',
            reviews: course.reviews || '',
            status: course.status || '',
            createdAt: course.createdAt || '',
            updatedAt: course.updatedAt || ''
          }));
          
          const Publiccourses = {
            Publiccourses: PubliccoursesObject,
            pagination: pagination
          }
        res.status(201).json({
            success: true,
            message: 'Course retrived successfully',
            Publiccourses: Publiccourses,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

module.exports = {
    createCourse,
    GetAllCourseAdmin,
    GetSingleCourseAdmin,
    UpdateCourse,
    UpdateCourseStatus,
    deleteCourse,
    GetAllPublicCourses,
}
