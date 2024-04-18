const { Op } = require('sequelize');
const {chat, UserProfile} = require("../models"); 
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const moment = require("moment");

const sendJobMessage = catchAsyncError(async (req, res, next) => {

    try {

        const {FromuserId, ToUserId, FromUserName, ToUserName, FromUserAvatar, toUserAvatar, jobId, message} = req.body

        await chat.create({
            FromuserId: FromuserId,
            ToUserId: ToUserId,
            FromUserName: FromUserName,
            ToUserName: ToUserName,
            FromUserAvatar: FromUserAvatar,
            toUserAvatar: toUserAvatar,
            jobId: jobId,
            readStatus: 'Delivered',
            message: message,
        })



        const data = await chat.findAll({
            where: {
                [Op.or]: [
                    { FromuserId: FromuserId },
                    { ToUserId: FromuserId }
                ]
            }
        });

        const latestMessagesByToUserId = {};
        data.forEach((message) => {
            const toUserId = message.ToUserId;
            const fromuserId = message.FromuserId;
            if (fromuserId === FromuserId || latestMessagesByToUserId[toUserId] === message) {
                if (!latestMessagesByToUserId[toUserId] || moment(message.createdAt).isAfter(latestMessagesByToUserId[toUserId].createdAt)) {
                    latestMessagesByToUserId[toUserId] = message;
                }
            }
        });
        
        const users = Object.values(latestMessagesByToUserId);

        const messageData = {
            users: users,
            data: data
        }

        res.status(201).json({
            success: true,
            message: 'Message Send',
            messageData: messageData
          });    
        
    }
    catch(error){
        return next(new errorHandler(error, 500));
    }

})


const getJobMessages = catchAsyncError(async (req, res, next) => {

    try {
        const userId = req.user.userid


        const data = await chat.findAll({
            where: {
                [Op.or]: [
                    { FromuserId: userId },
                    { ToUserId: userId }
                ]
            }
        });

        const latestMessagesByToUserId = {};
        data.forEach((message) => {
            const toUserId = message.ToUserId;
            const fromuserId = message.FromuserId;
            if (fromuserId === userId || latestMessagesByToUserId[toUserId] === message) {
                // Check if no latest message exists for this toUserId or if the current message is newer, update it
                if (!latestMessagesByToUserId[toUserId] || moment(message.createdAt).isAfter(latestMessagesByToUserId[toUserId].createdAt)) {
                    latestMessagesByToUserId[toUserId] = message;
                }
            }
        });
        
        const users = Object.values(latestMessagesByToUserId);

        const messageData = {
            users: users,
            data: data
        }

        res.status(201).json({
            success: true,
            message: 'Message Send',
            messageData: messageData
          });    
        
    }
    catch (error){
        return next(new errorHandler(error, 500));
    }

})

module.exports = {
    sendJobMessage,
    getJobMessages
}