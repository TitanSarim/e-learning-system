const { User, UserProfile } = require('../models'); // Adjust the path based on your project structure
const bcrypt = require('bcryptjs');
const generatedToken = require("../utils/jwtToken")
const setTokenCookie = require("../utils/sendToken")
const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');




const createUpdateUserProfile = catchAsyncError(async (req, res, next) => {

    const userId = req.user.userid


    const {firstname, lastname, avatar, tagline, about, experience, education, skills, social, certificates, cv  } = req.body;

    try {
        let userProfile = await UserProfile.findOne({
            where: {
                userId: userId
            }
        });

        if (!userProfile) {
            userProfile = await UserProfile.create({
                userId: userId,
                firstname: firstname,
                lastname: lastname,
                avatar: {url: avatar},
                tagline: tagline,
                about: {data: about},
                experience: {data: experience},
                education: {data: education},
                skills: {data: skills},
                social: {data: social},
                certificates: {data: certificates},
                cv: {url: cv}
            });
        } else {
            userProfile = await userProfile.update({
                userId: userId,
                firstname: firstname,
                lastname: lastname,
                avatar: {url: avatar},
                tagline: tagline,
                about: {data: about},
                experience: {data: experience},
                education: {data: education},
                skills: {data: skills},
                social: {data: social},
                certificates: {data: certificates},
                cv: {url: cv}
            });
        }
      res.status(201).json({
        success: true,
        message: 'Profile updated',
        userProfile: userProfile,
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
  });