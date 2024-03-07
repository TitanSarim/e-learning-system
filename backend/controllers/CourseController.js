const { User } = require('../models'); // Adjust the path based on your project structure
const bcrypt = require('bcryptjs');
const generatedToken = require("../utils/jwtToken")
const setTokenCookie = require("../utils/sendToken")
const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');


const createCourse  = catchAsyncError(async (req, res, next) => {


    try {
        
        const {courseTitle, courseCategory, courseDesc, tags, weeks, videoDivsArray} = req.body;

        const images = req.file.url

        console.log("videoDivsArray", videoDivsArray)

    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


module.exports = {
    createCourse
}