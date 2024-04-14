const { Op, where } = require('sequelize');
const { Jobs, UserProfile} = require("../models"); 
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

        const jobs = await Jobs.findOne({ where: { slug: slug } });

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

        const { category, level, duration, type  } = req.query;

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


module.exports = {
    createJob,
    updateJob,
    updateJobStatus,
    getAllHrJob,
    getSingleHrJob,
    deleteHrJob,
    getAllJobsPublic,

}