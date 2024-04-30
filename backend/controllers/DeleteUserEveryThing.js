const { Op} = require('sequelize');
const {User, Notifications, UserProfile, chat } = require("../models"); 
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const deleteUser = catchAsyncError(async(req, res, next) => {

    const userId = req.user.userid

    console.log("userId", userId)

      try {

        const getUser = await User.findOne({where: {id: userId}})
        if(getUser){
            User.destroy({where: {id: userId}})
        }

        // delete profile
        const getUserProfile = await UserProfile.findOne({where: {userId: userId}})
        if(getUserProfile){
            UserProfile.destroy({where: {userId: userId}})
        }

        const userChatToDelete = await chat.findAll({
            where: {
                [Op.or]: [
                    { FromUserId: userId },
                    { ToUserId: userId }
                ]
            }
        });
        if(userChatToDelete.length>0){
            userChatToDelete.forEach(async(item)=> {
                await item.destroy()
            })
        }

        // delete noti
        const notificationsToDelete = await Notifications.findAll({where: {userId: userId}})
        if (notificationsToDelete.length > 0) {
            notificationsToDelete.forEach(async (notification) => {
                await notification.destroy();
            });
        }

        res.status(206).json({
            success: true,
            message: 'Profile Deleted',
          });

      }catch(error){
        return next(new errorHandler(error, 500));
      }
})

module.exports = {
    deleteUser
}