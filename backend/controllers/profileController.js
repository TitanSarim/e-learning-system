const { User, UserProfile } = require('../models'); // Adjust the path based on your project structure
const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const azure = require('azure-storage');


const getUserProfile = catchAsyncError(async(req, res, next) => {

  console.log("sending data");

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
          avatar: userProfileTable.avatar?.url || '',
          location: userProfileTable.location || '',
          firstname: userProfileTable.firstname || '',
          lastname: userProfileTable.lastname || '',
          phoneno: userProfileTable.phoneno || '',
          Headline: userProfileTable.Headline?.data || '',
          about: userProfileTable.about?.data || '',
          education: userProfileTable.education?.data || [],
          skills: userProfileTable.skills?.data || [],
          experience: userProfileTable.experience?.data || [],
          social: userProfileTable.social?.data || {},
          cv: userProfileTable.cv?.url || '',
          coverletter: userProfileTable.coverletter?.data || '',
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

        let myProfileUpdate = await UserProfile.findOne({
            where: {
                userId: userId
            }
        });

        if (myProfileUpdate?.userId !== userId) {
            myProfileUpdate = await UserProfile.create({
                userId: userId,
                avatar: {url: avatar},
                location: location,
                firstname: firstname,
                lastname: lastname,
                phoneno: phoneno,
                Headline: {data: Headline},
                about: {data: about},
                education: {data: education},
                skills: {data: skills},
                experience: {data: experience},
                social: {data: social},
                cv: {url: cv},
                coverletter: {data: coverletter}
            });
        } else {
            myProfileUpdate = await UserProfile.update({
              userId: userId,
              avatar: {url: avatar},
              location: location,
              firstname: firstname,
              lastname: lastname,
              phoneno: phoneno,
              Headline: {data: Headline},
              about: {data: about},
              education: {data: education},
              skills: {data: skills},
              experience: {data: experience},
              social: {data: social},
              cv: {url: cv},
              coverletter: {data: coverletter}
            },
            {
              where: { userId: userId } 
        })
      }

      const  userTable = await User.findOne({
        where: {
            id: userId
        }
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
          userId: userTable.id,
          username: userTable.username,
          email:userTable.email,
          avatar: userProfileTable.avatar?.url || '',
          location: userProfileTable.location || '',
          firstname: userProfileTable.firstname || '',
          lastname: userProfileTable.lastname || '',
          phoneno: userProfileTable.phoneno || '',
          Headline: userProfileTable.Headline?.data || '',
          about: userProfileTable.about?.data || '',
          education: userProfileTable.education?.data || [],
          skills: userProfileTable.skills?.data || [],
          experience: userProfileTable.experience?.data || [],
          social: userProfileTable.social?.data || {},
          cv: userProfileTable.cv?.url || '',
          coverletter: userProfileTable.coverletter?.data || '',
        }
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


const updateUserAvatar = catchAsyncError(async(req, res, next) => {

  try {
    const userId = req.user.userid;
    const fileUrl = req.file.url;

    const userProfile = await UserProfile.findOne({
      where: { 
        userId: userId 
      },
    })

    const OldUrl =  userProfile.avatar?.url

    console.log("OldUrl", OldUrl)
    

    if(OldUrl){
      
      const oldBlobName = OldUrl.split('/').pop();
      const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT_NAME, process.env.AZURE_STORAGE_ACCOUNT_KEY);
      blobService.deleteBlobIfExists('avatar', oldBlobName, (error, result) => {
        if (error) {
          console.error('Error deleting Image:', error);
        } else {
          console.log('Blob deleted successfully:', oldBlobName);

          const parsedUrl = new URL(fileUrl);
          const cleanFileUrl = parsedUrl.origin + parsedUrl.pathname;

          UserProfile.update(
            { avatar: { url: cleanFileUrl } },
            { where: { userId: userId } }
          ).then(() => {
            res.status(201).json({
              success: true,
              message: 'Image Uploaded',
              avatarUrl: cleanFileUrl
            });
          }).catch(error => {
            console.error('Error updating user profile:', error);
            return next(new errorHandler(error, 500));
          });
        }
      });
    }else {

      const parsedUrl = new URL(fileUrl);
      const cleanFileUrl = parsedUrl.origin + parsedUrl.pathname;

      const updatePorifle = await UserProfile.update(
        { avatar: { url: cleanFileUrl } },
        { where: { userId: userId } }
      )

      res.status(201).json({
        success: true,
        message: 'Image Uploaded',
        avatarUrl: cleanFileUrl
      });

    }


  } catch (error) {
    return next(new errorHandler(error, 500));

  }
})

const deleteUserAvatar = catchAsyncError(async(req, res, next) => {
  try {

    const userId = req.user.userid;

    const userProfile = await UserProfile.findOne({
      where: { 
        userId: userId 
      },
    })

    const OldUrl =  userProfile.avatar?.url

    const oldBlobName = OldUrl.split('/').pop();

    const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT_NAME, process.env.AZURE_STORAGE_ACCOUNT_KEY);
    blobService.deleteBlobIfExists('avatar', oldBlobName, (error, result) => {
      if (error) {
        console.error('Error deleting Image:', error);
      } else {
        console.log('Blob deleted successfully:', oldBlobName);
        UserProfile.update(
          { avatar: "" },
          { where: { userId: userId } }
        ).then(() => {
          res.status(201).json({
            success: true,
            message: 'Image Deleted Successfully',
          });
        }).catch(error => {
          console.error('Error updating user profile:', error);
          return next(new errorHandler(error, 500));
        });
      }
    
    });
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    return next(new errorHandler(error, 500));
  }
})  

  module.exports = {
    getUserProfile,
    createUpdateUserProfile,
    updateUserAvatar,
    deleteUserAvatar,
  }