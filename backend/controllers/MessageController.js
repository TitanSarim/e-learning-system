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

        // const latestMessagesByToUserId = {};
        // data.forEach((message) => {
        //     const toUserId = message.ToUserId;
        //     const fromuserId = message.FromuserId;
        //     if (fromuserId === FromuserId || latestMessagesByToUserId[toUserId] === message) {
        //         if (!latestMessagesByToUserId[toUserId] || moment(message.createdAt).isAfter(latestMessagesByToUserId[toUserId].createdAt)) {
        //             latestMessagesByToUserId[toUserId] = message;
        //         }
        //     }
        // });
        
        const latestMessagesByToUserId = {};

        data.forEach((message) => {
            const toUserId = message.ToUserId;
            const fromUserId = message.FromuserId;
            const key1 = `${fromUserId}-${toUserId}`;
            const key2 = `${toUserId}-${fromUserId}`;
            
            // Check if a message already exists between these users
            if (latestMessagesByToUserId[key1]) {
                // Compare timestamps and keep the latest one
                if (moment(message.createdAt).isAfter(latestMessagesByToUserId[key1].createdAt)) {
                    latestMessagesByToUserId[key1] = message;
                }
            } else if (latestMessagesByToUserId[key2]) {
                // Check the reverse combination
                if (moment(message.createdAt).isAfter(latestMessagesByToUserId[key2].createdAt)) {
                    latestMessagesByToUserId[key2] = message;
                }
            } else {
                // If no message exists, add this one
                latestMessagesByToUserId[key1] = message;
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

const sendJobMessageJobSeeker = catchAsyncError(async (req, res, next) => {

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
            const fromUserId = message.FromuserId;
            const key1 = `${fromUserId}-${toUserId}`;
            const key2 = `${toUserId}-${fromUserId}`;
            
            // Check if a message already exists between these users
            if (latestMessagesByToUserId[key1]) {
                // Compare timestamps and keep the latest one
                if (moment(message.createdAt).isAfter(latestMessagesByToUserId[key1].createdAt)) {
                    latestMessagesByToUserId[key1] = message;
                }
            } else if (latestMessagesByToUserId[key2]) {
                // Check the reverse combination
                if (moment(message.createdAt).isAfter(latestMessagesByToUserId[key2].createdAt)) {
                    latestMessagesByToUserId[key2] = message;
                }
            } else {
                // If no message exists, add this one
                latestMessagesByToUserId[key1] = message;
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
            const fromUserId = message.FromuserId;
            const key1 = `${fromUserId}-${toUserId}`;
            const key2 = `${toUserId}-${fromUserId}`;
            
            // Check if a message already exists between these users
            if (latestMessagesByToUserId[key1]) {
                // Compare timestamps and keep the latest one
                if (moment(message.createdAt).isAfter(latestMessagesByToUserId[key1].createdAt)) {
                    latestMessagesByToUserId[key1] = message;
                }
            } else if (latestMessagesByToUserId[key2]) {
                // Check the reverse combination
                if (moment(message.createdAt).isAfter(latestMessagesByToUserId[key2].createdAt)) {
                    latestMessagesByToUserId[key2] = message;
                }
            } else {
                // If no message exists, add this one
                latestMessagesByToUserId[key1] = message;
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

const getJobMessagesJobSeeker = catchAsyncError(async (req, res, next) => {

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

        // data.forEach((message) => {
        //     const toUserId = message.ToUserId;
        //     const fromuserId = message.FromuserId;
        //     if (toUserId === userId || latestMessagesByToUserId[fromuserId] === message) {
        //         // Check if no latest message exists for this fromuserId or if the current message is newer, update it
        //         if (!latestMessagesByToUserId[fromuserId] || moment(message.createdAt).isAfter(latestMessagesByToUserId[fromuserId].createdAt)) {
        //             latestMessagesByToUserId[fromuserId] = message;
        //         }
        //     }
        // });
        
        data.forEach((message) => {
            const toUserId = message.ToUserId;
            const fromUserId = message.FromuserId;
            const key1 = `${fromUserId}-${toUserId}`;
            const key2 = `${toUserId}-${fromUserId}`;
            
            // Check if a message already exists between these users
            if (latestMessagesByToUserId[key1]) {
                // Compare timestamps and keep the latest one
                if (moment(message.createdAt).isAfter(latestMessagesByToUserId[key1].createdAt)) {
                    latestMessagesByToUserId[key1] = message;
                }
            } else if (latestMessagesByToUserId[key2]) {
                // Check the reverse combination
                if (moment(message.createdAt).isAfter(latestMessagesByToUserId[key2].createdAt)) {
                    latestMessagesByToUserId[key2] = message;
                }
            } else {
                // If no message exists, add this one
                latestMessagesByToUserId[key1] = message;
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
    sendJobMessageJobSeeker,
    getJobMessages,
    getJobMessagesJobSeeker
}