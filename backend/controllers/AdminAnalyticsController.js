const { Op, Sequelize, where } = require('sequelize');
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { Course, Order, User} = require("../models"); 


const getAnalytics  = catchAsyncError(async (req, res, next) => {

    try {

        const role = req.user.role

        if(role === "admin"){

            // Total Number of Views by Course
            const viewsByCourse = await Course.findAll({
                attributes: ['course_title', 'views']
            });

            const courses = await Course.findAll()
            const revenueByCourse = [];
            for (const course of courses) {
                if (course.inrolled_by.id && course.inrolled_by.id.length > 0) {
                    const revenue = course.inrolled_by.id.length * course.price;
                    revenueByCourse.push({
                        id: course.id,
                        title: course.course_title,
                        teacher: course.teacher_name, 
                        revenue: revenue,
                    });
                }
            }

            const sortedCoursesByRevenue = Object.entries(revenueByCourse)
                    .sort(([, revenueA], [, revenueB]) => revenueB - revenueA);

    

            const today = new Date();
            const currentYear = today.getFullYear();
            const incomeByMonth = {};
            for (let month = 0; month < 12; month++) {
                const firstDayOfMonth = new Date(currentYear, month, 1);
                const lastDayOfMonth = new Date(currentYear, month + 1, 0);
                
                const income = await Order.sum('total_amount', {
                    where: {
                      createdAt: {
                        [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                      }
                    }
                  });
            
                  incomeByMonth[month + 1] = income || 0; 
                
            }            

            const totalIncome = await Order.sum('total_amount');
            const totalgst = await Order.sum('gst');
            const studentCount = await User.count({
                where: {
                  role: 'Student'
                }
              });
            const analytics= {
                viewsByCourse,
                sortedCoursesByRevenue,
                incomeByMonth,
                studentCount,
                totalIncome,
                totalgst,
            }

            res.status(201).json({
                success: true,
                message: 'Analytics retrived successfully',
                analytics: analytics,
            });

        }else{
            res.status(201).json({
                success: true,
                message: 'Attention, You are not allowed',
                analytics: [],
            });
        }

    }catch (error) {
        return next(new errorHandler(error, 500));
    }


})


module.exports = {
    getAnalytics
}