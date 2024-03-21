const { User, UserProfile } = require('../models'); // Adjust the path based on your project structure
const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');


const getUserProfile = catchAsyncError(async(req, res, next) => {

    try {

      const userId = req.user.userid

      const userTable = await User.findOne({
        where: { 
            id: userId 
        },
      });

  
      let myProfile = {
        userId: userTable.id,
        username: userTable.username,
        email:userTable.email,
        avatar: '',
        location: '',
        firstname: '',
        lastname: '',
        phoneno: '',
        Headline: '',
        about: '',
        education: '',
        skills: '',
        experience: '',
        social: '',
        cv: '',
        coverletter: '',
      }

      const userProfileTable = await UserProfile.findOne({
        where: { 
          userId: userId 
        },
      })

      if(userProfileTable){
        myProfile = {
          ...myProfile,
          avatar: JSON.parse(userProfileTable.avatar).url,
          location: userProfileTable.location,
          firstname: userProfileTable.firstname,
          lastname: userProfileTable.lastname,
          phoneno: userProfileTable.phoneno,
          Headline: JSON.parse(userProfileTable.Headline),
          about: JSON.parse(userProfileTable.about),
          education: JSON.parse(userProfileTable.education),
          skills: JSON.parse(userProfileTable.skills).data,
          experience: JSON.parse(userProfileTable.experience),
          social: JSON.parse(userProfileTable.social),
          cv: JSON.parse(userProfileTable.cv).url,
          coverletter: JSON.parse(userProfileTable.coverletter),
        }
      }
      
      res.status(201).json({
        success: true,
        message: 'Profile retrived',
        myProfile: myProfile,
      });

    } catch (error) {
       return next(new errorHandler(error, 500));
    }

})


const createUpdateUserProfile = catchAsyncError(async (req, res, next) => {

    const userId = req.user.userid


    const {avatar, location, firstname, lastname, phoneno, Headline, about,  education, skills, experience, social, cv, coverletter} = req.body;

    try {
        let myProfile = await UserProfile.findOne({
            where: {
                userId: userId
            }
        });

        if (!myProfile) {
            myProfile = await UserProfile.create({
                userId: userId,
                avatar: {url: avatar},
                location: location,
                firstname: firstname,
                lastname: lastname,
                phoneno: phoneno,
                Headline: Headline,
                about: about,
                education: education,
                skills: {data: skills},
                experience: experience,
                social: social,
                cv: {url: cv},
                coverletter: coverletter
            });
        } else {
            myProfile = await UserProfile.update({
              userId: userId,
              avatar: {url: avatar},
              location: location,
              firstname: firstname,
              lastname: lastname,
              phoneno: phoneno,
              Headline: Headline,
              about: about,
              education: education,
              skills: {data: skills},
              experience: experience,
              social: social,
              cv: {url: cv},
              coverletter: coverletter
            },
            {
              where: { userId: userId } 
        })
      }
      res.status(201).json({
        success: true,
        message: 'Profile updated',
        myProfile: myProfile,
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
  });


  module.exports = {
    getUserProfile,
    createUpdateUserProfile
  }