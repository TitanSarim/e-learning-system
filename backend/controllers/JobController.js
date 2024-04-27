const { Op, where } = require('sequelize');
const { Jobs, UserProfile, User} = require("../models"); 
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { generateSlug } = require("../middleware/GenerateSlug");


const createJob = catchAsyncError(async (req, res, next) => {

    const userId = req.user.userid
    const {jobTitle, company, education, category, skillLevel, duration, type, salary, jobDesc, country, state, city, status} = req.body
    
    try {

        const slug = generateSlug(jobTitle, userId)

        const jobs = await Jobs.create({
            userId: userId,
            slug: slug,
            jobTitle: jobTitle,
            company: company,
            education: education,
            category: category,
            skillLevel: skillLevel,
            duration: duration,
            type: type,
            salary: salary,
            jobDesc: jobDesc, 
            country: country,
            state: state,
            city: city,
            status: status,
            Applications: []
        })


        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            jobs: jobs,
        });

        
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const updateJob = catchAsyncError(async (req, res, next) => {

    const userId = req.user.userid
    const {jobTitle, company, category, skillLevel, duration, type, salary, jobDesc, country, state, city, status} = req.body
    const slug = req.params.slug
    try {

        const newSlug = generateSlug(jobTitle, userId)

        const jobs = await Jobs.update({
            slug: newSlug,
            jobTitle: jobTitle,
            company: company,
            category: category,
            skillLevel: skillLevel,
            duration: duration,
            type: type,
            salary: salary,
            jobDesc: jobDesc, 
            country: country,
            state: state,
            city: city,
            status: status
        },
        { where: { slug: slug } }
        );

        res.status(201).json({
            success: true,
            message: 'Job updated successfully',
            jobs: jobs,
        });

        
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const updateJobStatus = catchAsyncError(async (req, res, next) => {

    const {status} = req.body
    const slug = req.params.slug

    try {


        await Jobs.update({
            status: status
            },
            {where: {slug: slug}}
        )

        const jobs = await Jobs.findOne({where: {slug: slug}})

        res.status(201).json({
            success: true,
            message: 'Job updated successfully',
            jobs: jobs,
        });

        
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const getAllHrJob = catchAsyncError(async (req, res, next) => {

    const userId = req.user.userid
    
    try {


        const jobs = await Jobs.findAll({
           where: {userId: userId}
        })

        res.status(201).json({
            success: true,
            message: 'Job retrived successfully',
            jobs: jobs,
        });

        
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const getSingleHrJob = catchAsyncError(async (req, res, next) => {
    
    try {

        const slug = req.params.slug;
        const userId = req.user.userid

        const jobData = await Jobs.findOne({ where: { slug: slug, userId: userId } });

        const appliedIds = jobData.Applications.id;
        console.log("appliedIds", appliedIds)

        let jobsApplications = null
        if(appliedIds !== undefined) {
            jobsApplications = await UserProfile.findAll({
                where: {
                    userId: appliedIds
                }
            });
        

            const userIds = jobsApplications.map(application => application.userId);

            const usernames = await User.findAll({
                where: {
                    id: userIds
                },
                attributes: ['id', 'username', 'email'] 
            });


            jobsApplications = jobsApplications.map(application => {
                const user = usernames.find(username => username.id === application.userId);
                return { 
                    ...application.toJSON(), 
                    username: user ? user.username : null, 
                    email: user ? user.email : null 
                };
            });

        }

        const jobs = {
            jobs: jobData,
            jobsApplications: jobsApplications
        }

        res.status(201).json({
            success: true,
            message: 'Job retrived successfully',
            jobs: jobs,
        });

        
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const deleteHrJob = catchAsyncError(async (req, res, next) => {
    
    try {

        const slug = req.params.slug;

        await Jobs.destroy({where: {slug: slug}})

        res.status(201).json({
            success: true,
            message: 'Job deleted successfully',
        });

        
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


const getAllJobsPublic = catchAsyncError(async(req, res, next) => {

    try {

        const { category, level, duration, type, date  } = req.query;

        console.log("date", date)

        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const status = 'active'

        const filter = {};
        if (category) filter.category = category;
        if (level) filter.skillLevel = level;
        if (duration) filter.duration = duration;
        if (type) filter.type = type;
        if (status) filter.status = status;


        if (date === 'Last 24 Hours') {
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            filter.createdAt = {
                [Op.gte]: twentyFourHoursAgo, 
            };
        } else if (date === 'Last Week') {
            const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            filter.createdAt = {
                [Op.gte]: oneWeekAgo,
            };
        }

        const totalCount = await Jobs.count({
            where: filter, 
        });

       const AllJobs = await Jobs.findAll({
            offset: skip,
            limit: limit,
            where: filter,
       })

       const userIds = AllJobs.map(job => job.userId);

        const userProfiles = await UserProfile.findAll({
            where: {
                userId: userIds
            }
        });

        const jobsWithProfiles = AllJobs.map(job => {
            const userProfile = userProfiles.find(profile => profile.userId === job.userId);
            return { ...job.toJSON(), userProfile: userProfile || null };
        });

       const totalPages = Math.ceil(totalCount / limit);

       const pagination = {
           totalPages: totalPages,
           currentPage: page,
           totalCourses: totalCount
       };

        const jobs = {
                AllJobs: jobsWithProfiles,
                pagination: pagination
        }

        res.status(201).json({
            success: true,
            message: 'Job deleted successfully',
            jobs: jobs
        });

        
    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

const jobApply = catchAsyncError (async (req, res, next) => {

    try {
        
        const userId = req.user.userid
    
        const {slug} = req.body

        console.log("slug", slug)

        const existingData = await Jobs.findOne({ where: { slug: slug } });
        let appliedByIds = existingData.Applications.id || [];
        appliedByIds.push(userId);
        await Jobs.update({ Applications: { id: appliedByIds } }, { where: { slug: slug } });

        res.status(201).json({
            success: true,
            message: 'Applied Successfully',
        });

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


const getRelatedKeyWords = catchAsyncError(async (req, res, next) => {
    try {
        const { searchTitle } = req.body;

        const relatedJobs = await Jobs.findAll({
            where: {
                jobTitle: {
                    [Op.like]: `%${searchTitle}%` 
                }
            },
            attributes: ['jobTitle'],
            order: [
                ['jobTitle', 'ASC'] 
            ],
            limit: 10 
        });

        const relatedTitles = relatedJobs.map(course => course.jobTitle);

        res.json(relatedTitles);
    } catch (error) {
        return next(new errorHandler(error, 500));
    }
});



module.exports = {
    createJob,
    updateJob,
    updateJobStatus,
    getAllHrJob,
    getSingleHrJob,
    deleteHrJob,
    getAllJobsPublic,
    jobApply,
    getRelatedKeyWords
}