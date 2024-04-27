const { Op, Sequelize } = require('sequelize');
const { Course, UserProfile, Order, LeaderBoard, ViewdVideos } = require("../models"); // Adjust the path based on your project structure
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
            views: 0,
            price: price,
            language:language,
            level:level,
            hours:hours,
            inrolled_by: { id: []},
            teacher_name: teacherName,
            comments: {"data": []},
            reviews: 0,
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

        await Course.update({
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
            price: price,
            language:language,
            level:level,
            hours:hours,
            teacher_name: teacherName,
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

        const userId = req.user.userid
        const role = req.user.role

        if(role === 'admin'){
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
        }else if(role === 'Teacher'){
            const AdminAllcourses  = await Course.findAll({
                where: {
                    teacherId: userId
                }
            });

            if(!AdminAllcourses){
                res.status(204).json({
                    success: true,
                    message: 'No Course found',
                    Admincourses: [],
                  });
            }

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
        }


    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

// admin
const GetSingleCourseAdmin  = catchAsyncError(async (req, res, next) => {

    const slug = req.params.slug;


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


// Public courses home page
const GetAllPublicCoursesHomePage  = catchAsyncError(async (req, res, next) => {

    try {
        
        const allPublicCourses = await Course.findAll()

        const coursesByCategory = allPublicCourses.reduce((acc, course) => {
            if (!acc[course.category]) {
              acc[course.category] = [];
            }
            acc[course.category].push(course);
            return acc;
          }, {});
          
          const Publiccourses = {};
          for (const category in coursesByCategory) {
            Publiccourses[category] = coursesByCategory[category].slice(0, 4);
          }
        

          res.status(201).json({
            success: true,
            message: 'Courses Retrived successfully',
            Publiccourses: Publiccourses
        });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

// Public All Courses
const GetAllPublicCourses  = catchAsyncError(async (req, res, next) => {


    try {
        const { category, rating, level, language, price, searchTitle } = req.query;

        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 20; // Default limit 10
        const skip = (page - 1) * limit;
        const status = 'active'

        const filter = {};
        if (category) filter.category = category;
        if (level) filter.level = level;
        if (language) filter.language = language;
        if (status) filter.status = status;
        
        let orderOption = []; // Initialize order option

        if (price === 'ASC' || price === 'DESC') {
            orderOption.push(['price', price]); // Construct order option array
        }


        const totalCount = await Course.count({
            where: filter, // Apply filters
          });
          
        let allPublicCourses
        if(searchTitle){
            allPublicCourses = await Course.findAll({
                where:{
                    [Op.or]: [
                        { course_title: { [Op.iLike]: `%${query}%` } },
                        { course_desc: { [Op.iLike]: `%${query}%` } },
                    ]
                },
                offset: skip,
                limit: limit,
                where: filter,
                order: orderOption,
            });
        }else{
            allPublicCourses = await Course.findAll({
                offset: skip,
                limit: limit,
                where: filter,
                order: orderOption,
            });
        }
        


        const totalPages = Math.ceil(totalCount / limit);

        const pagination = {
            totalPages: totalPages,
            currentPage: page,
            totalCourses: totalCount
        };

        function customSort(a, b) {
            const randomA = Math.random();
            const randomB = Math.random();
        
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            const reviewsA = parseFloat(a.reviews);
            const reviewsB = parseFloat(b.reviews);
        
            // If the price filter is set to ASC or DESC, prioritize sorting by price
            if (price === 'ASC') {
                if (priceA < priceB) return -1;
                if (priceA > priceB) return 1;
            } else if (price === 'DESC') {
                if (priceA > priceB) return -1;
                if (priceA < priceB) return 1;
            }
        
            // If prices are equal or no price filter is applied, sort by reviews
            if (reviewsA > reviewsB) return -1;
            if (reviewsA < reviewsB) return 1;
        
            // If reviews are equal or no reviews available, apply random sorting
            if (randomA < randomB) return -1;
            if (randomA > randomB) return 1;
            return 0;
        }
        
        const prices = allPublicCourses.map(course => parseFloat(course.price));
        const midPrice = Math.max(...prices) / 2; 

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const shuffledCourses = shuffleArray(allPublicCourses);
        const sortedCourses = shuffledCourses.sort(customSort);
        
        const PubliccoursesObject = sortedCourses.map(course => ({
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


const GetSinglePublicCourse  = catchAsyncError(async (req, res, next) => {

    const slug = req.params.slug;

    try {

        const PublicSinglecourse  = await Course.findOne({ where: { slug: slug } });
        PublicSinglecourse.views = PublicSinglecourse.views + 1;
        await PublicSinglecourse.save();

        if (!PublicSinglecourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        // ! related course starts
         // Get the related courses by teacher's name
         const relatedCoursesByTeacher = await Course.findAll({ 
            where: { 
                teacher_name: PublicSinglecourse.teacher_name, 
                id: { [Op.not]: PublicSinglecourse.id } 
            },
            order: Sequelize.literal('rand()'),
            limit: 2 
        });

         // Get related courses by category
         const relatedCoursesByCategory = await Course.findAll({ 
            where: { 
                category: PublicSinglecourse.category, 
                id: { [Op.not]: PublicSinglecourse.id }
            },
            order: Sequelize.literal('rand()'), 
            limit: 2
        });
    
        let additionalCoursesByTeacher = [];
        if (relatedCoursesByCategory.length < 1) {
            additionalCoursesByTeacher = await Course.findAll({ 
                where: { 
                    teacher_name: PublicSinglecourse.teacher_name, 
                    id: { [Op.not]: PublicSinglecourse.id } 
                },
                order: Sequelize.literal('rand()'), // Randomize the order
                limit: 2 
            });
        }

        const relatedCourses = [...relatedCoursesByTeacher, ...relatedCoursesByCategory, ...additionalCoursesByTeacher];

        // Ensure that exactly 3 courses are sent to the frontend
        const finalRelatedCourses = relatedCourses.slice(0, 4);

        // Shuffle the final related courses array to randomize the order
        finalRelatedCourses.sort(() => Math.random() - 0.5);

        //! related course ends
        

        const TeacherAvatar = await UserProfile.findOne({ 
            where: { userId: PublicSinglecourse.teacherId },
            attributes: ['avatar'] 
        });

        let featuredVideos = [];

        if (PublicSinglecourse && PublicSinglecourse.course_content && PublicSinglecourse.course_content.data) {
            featuredVideos = PublicSinglecourse.course_content.data.reduce((acc, week) => {
                const featuredWeekVideos = week.videos.filter(video => video.isFeatured);
                return acc.concat(featuredWeekVideos);
            }, []);
        }

        const PubliccoursesObject = {
            id: PublicSinglecourse.id || '',
            teacherId: PublicSinglecourse.teacherId || '',
            TeacherAvatar: TeacherAvatar || '',
            slug: PublicSinglecourse.slug || '',
            course_title: PublicSinglecourse.course_title || '',
            category: PublicSinglecourse.category || '',
            tags: PublicSinglecourse.tags || '',
            timeline: PublicSinglecourse.timeline || '',
            course_desc: PublicSinglecourse.course_desc.desc || '',
            course_thumbnail: PublicSinglecourse.course_thumbnail.url || '',
            course_content: PublicSinglecourse.course_content.data || '',
            featuredVideos: featuredVideos,
            views: PublicSinglecourse.views || '',
            price: PublicSinglecourse.price || '',
            language: PublicSinglecourse.language || '',
            level: PublicSinglecourse.level || '',
            hours: PublicSinglecourse.hours || '',
            inrolled_by: PublicSinglecourse.inrolled_by || '',
            teacher_name: PublicSinglecourse.teacher_name || '',
            comments: PublicSinglecourse.comments || '',
            reviews: JSON.parse(PublicSinglecourse.reviews) || '',
            status: PublicSinglecourse.status || '',
            createdAt: PublicSinglecourse.createdAt || '',
            updatedAt: PublicSinglecourse.updatedAt || '',
            relatedCourses: finalRelatedCourses || '',
          };
          
        res.status(201).json({
            success: true,
            message: 'Course retrived successfully',
            PubliccoursesObject: PubliccoursesObject,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


// Get User Inrolled Course --Single Course
const GetSingleInrolledCourse  = catchAsyncError(async (req, res, next) => {

    const userId = req.user.userid;
    try {

        const {slug} = req.body

        const SingleInrolledCourse  = await Course.findOne({ where: { slug: slug } });

        if (!SingleInrolledCourse ) {
            return res.status(404).json({ error: "Course not found" });
        }

        const TeacherAvatar = await UserProfile.findOne({ 
            where: { userId: SingleInrolledCourse.teacherId },
            attributes: ['avatar'] 
        })

        const getCompletionRate = await LeaderBoard.findOne({
            where: {userId: userId, slug: slug}
        })

        const getViewedVideos = await ViewdVideos.findAll({
            where: {userId: userId, slug: slug}
        })

        const InrolledCourses  = {
            id: SingleInrolledCourse.id || '',
            teacherId: SingleInrolledCourse.teacherId || '',
            TeacherAvatar: TeacherAvatar || '',
            slug: SingleInrolledCourse.slug || '',
            course_title: SingleInrolledCourse.course_title || '',
            category: SingleInrolledCourse.category || '',
            tags: SingleInrolledCourse.tags || '',
            timeline: SingleInrolledCourse.timeline || '',
            course_desc: SingleInrolledCourse.course_desc.desc || '',
            course_thumbnail: SingleInrolledCourse.course_thumbnail.url || '',
            course_content: SingleInrolledCourse.course_content.data || '',
            views: SingleInrolledCourse.views || '',
            price: SingleInrolledCourse.price || '',
            language: SingleInrolledCourse.language || '',
            level: SingleInrolledCourse.level || '',
            hours: SingleInrolledCourse.hours || '',
            inrolled_by: SingleInrolledCourse.inrolled_by || '',
            teacher_name: SingleInrolledCourse.teacher_name || '',
            comments: SingleInrolledCourse.comments || '',
            reviews: SingleInrolledCourse.reviews || '',
            status: SingleInrolledCourse.status || '',
            ViewedVideos: getViewedVideos || '',
            CompletionRate: getCompletionRate || '',
            createdAt: SingleInrolledCourse.createdAt || '',
            updatedAt: SingleInrolledCourse.updatedAt || '',
          };
          
        res.status(201).json({
            success: true,
            message: 'Course retrived successfully',
            InrolledCourses: InrolledCourses,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

// Get User Inrolled Course --all Courses
const GetAllInrolledCourse  = catchAsyncError(async (req, res, next) => {

    const userId = req.user.userid

    try {

        const orders = await Order.findAll({ where: { userId: userId } });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found for this user" });
        }

        const courseIds = orders.flatMap(order => order.course_ids);

        const courses = await Course.findAll({ where: { id: courseIds } });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: "No courses found" });
        }

        const InrolledCourses  = courses.map(course => ({
            id: course.id || '',
            teacherId: course.teacherId || '',
            slug: course.slug || '',
            course_title: course.course_title || '',
            category: course.category || '',
            tags: course.tags || '',
            timeline: course.timeline || '',
            course_desc: course.course_desc.desc || '',
            course_thumbnail: course.course_thumbnail.url || '',
            course_content: course.course_content.data || '',
            views: course.views || '',
            price: course.price || '',
            language: course.language || '',
            level: course.level || '',
            hours: course.hours || '',
            inrolled_by: course.inrolled_by || '',
            teacher_name: course.teacher_name || '',
            comments: course.comments || '',
            reviews: JSON.parse(course.reviews) || '',
            status: course.status || '',
            createdAt: course.createdAt || '',
            updatedAt: course.updatedAt || '',
        }));
          
        res.status(201).json({
            success: true,
            message: 'Course retrived successfully',
            InrolledCourses: InrolledCourses,
          });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


// course completion rate handler -- pending 
const SaveCompletionRateOfCourse = catchAsyncError(async (req, res, next) => {
    const userId = req.user.userid;
    const {slug, url} = req.body;
  
    try {

        const existingRecord = await ViewdVideos.findOne({
            where: {
                userId: userId,
                url: url
            }
        });

        if (existingRecord) {
            return res.status(200).json({
                success: false,
                message: 'Record already exists',
            });
        }

        const course = await Course.findOne({
            where: {
                slug: slug
            }
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }
        const courseContent =  course.course_content;
        // console.log("courseContent", JSON.parse(courseContent))

        let courseContentUpdated = courseContent.data.map(week => {
            week.videos = week.videos.map(video => {
                if (video.videoFile === url) {
                    return { ...video, completed: true };
                }
                return video;
            });
            return week;
        });

        const LeaderboardCheck = await LeaderBoard.findOne({
            where: {userId: userId, slug: slug}
        })

        if(!LeaderboardCheck){
            await LeaderBoard.create({
                userId: userId,
                slug: slug,
                weekData: courseContentUpdated
            })
        } else {
            // Update specific week and video's completed status
            let updatedWeekData = LeaderboardCheck.weekData.map(week => {
                week.videos = week.videos.map(video => {
                    if (video.videoFile === url) {
                        return { ...video, completed: true };
                    }
                    return video;
                });
                return week;
            });

            // Update the existing record
            await LeaderBoard.update({
                weekData: updatedWeekData
            }, {
                where: {
                    userId: userId,
                    slug: slug
                }
            });
        }

        await ViewdVideos.create({
            userId: userId,
            slug: slug,
            url: url,
            isViewd: 'true' 
        });

        const LeaderboardProgressCheck = await LeaderBoard.findOne({
            where: {userId: userId, slug: slug}
        })

        
        if (!LeaderboardProgressCheck) {
            return res.status(404).json({
                success: false,
                message: 'LeaderBoard data not found',
            });
        }

        const weekData = LeaderboardProgressCheck.weekData;
        let totalVideos = 0;
        let completedVideos = 0;

        weekData.forEach(week => {
            totalVideos += week.videos.length;
            week.videos.forEach(video => {
                if (video.completed) {
                    completedVideos++;
                }
            });
        });
        
        const completionPercentage = (completedVideos / totalVideos) * 100;

        await LeaderBoard.update({
            CompletionPercentage: completionPercentage
        },{
            where: {userId: userId, slug: slug}, 
        })
      
      res.status(201).json({
        success: true,
        message: 'Completion rate saved successfully',
        completionPercentage: completionPercentage
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
});
  

const addCommentsController = catchAsyncError(async (req, res, next) => {

    try {

        const slug = req.params.slug;
        const {reviews, comment} = req.body

        const course = await Course.findOne({ where: { slug: slug } });

        const newComment = {
            user: comment.user,
            username: comment.username,
            avatarurl: comment.avatarurl,
            comment: comment.comment,
            reviews: comment.reviews,
            date: comment.date
          };

          
        const existingComments = course.comments ? course.comments.data || [] : [];
        const updatedComments = [...existingComments, newComment];

        const countOfComments = updatedComments.length;
          
        let averageRating = 0;
        if(course.reviews === 0){
            averageRating = reviews;
        }else {
            updatedComments.forEach(comment => {
                averageRating += parseInt(comment.reviews);
            });
        }
        const overAllRzating = averageRating / countOfComments

        course.comments = { data: updatedComments };
        course.reviews = overAllRzating;
        await course.save();

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
        });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


const getRelatedKeyWords = catchAsyncError(async (req, res, next) => {
    try {
        const { searchTitle } = req.body;

        const relatedCourses = await Course.findAll({
            where: {
                course_title: {
                    [Op.like]: `%${searchTitle}%` 
                }
            },
            attributes: ['course_title'],
            order: [
                ['course_title', 'ASC'] 
            ],
            limit: 10
        });

        const relatedTitles = relatedCourses.map(course => course.course_title);

        res.json(relatedTitles);
    } catch (error) {
        return next(new errorHandler(error, 500));
    }
});


module.exports = {
    createCourse,
    GetAllCourseAdmin,
    GetSingleCourseAdmin,
    UpdateCourse,
    UpdateCourseStatus,
    deleteCourse,
    GetAllPublicCoursesHomePage,
    GetAllPublicCourses,
    GetSinglePublicCourse,
    GetSingleInrolledCourse,
    GetAllInrolledCourse,
    SaveCompletionRateOfCourse,
    addCommentsController,
    getRelatedKeyWords
}


