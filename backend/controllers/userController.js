const { User } = require('../models'); // Adjust the path based on your project structure
const bcrypt = require('bcryptjs');
const generatedToken = require("../utils/jwtToken")
const setTokenCookie = require("../utils/sendToken")
const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');




  const createUser = catchAsyncError(async (req, res, next) => {
    const { username, email, age, gender, role, password, status } = req.body;

    try {
      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return next(new errorHandler('User with this email already exists', 400));
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await User.create({
        username,
        email,
        age,
        gender,
        role,
        password: hashedPassword,
        status,
      });

      const token = generatedToken(user.id, user.email, user.username, user.role);
      setTokenCookie(res, token);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: user,
        token,
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
  });

  const loginUser = catchAsyncError(async (req, res, next) => {

    try {

        const {email, password } = req.body;

        
        const user = await User.findOne({
            where: {email},
        })

        if(!user){
            return next(new errorHandler('Invalid Email', 400))
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if(!passwordMatches){
            return next(new errorHandler('Invalid Password', 400))
        }

        console.log('User Logged in Successfully');


        const token = generatedToken(user.id, user.email, user.username, user.role)
        setTokenCookie(res, token)
        
  
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: user,
        token,
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
  });

  const updateUser = catchAsyncError(async (req, res, next) => {
    const { userId } = req.params;
    const { username, email, age, gender, role, password, status } = req.body;
  
    try {

      const user = await User.findByPk(userId);
  
      if (!user) {
        return next(new errorHandler('User not found', 404));
      }
  
      // If the email is being updated, check for uniqueness
      if (email && email !== user.email) {
        const duplicateEmail = await User.findOne({
          where: { email },
        });
  
        if (duplicateEmail) {
          return next(new errorHandler('Email is already in use', 400));
        }
      }
  
      // Update user information
      user.username = username || user.username;
      user.email = email || user.email;
      user.age = age || user.age;
      user.gender = gender || user.gender;
      user.role = role || user.role;
      user.status = status || user.status;
  
      // If password is provided, update it
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: user,
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
  });
  
  const getAllUsers = catchAsyncError(async (req, res, next) => {
    try {
      const users = await User.findAll();
  
      res.status(200).json({
        success: true,
        message: 'All users retrieved successfully',
        users: users,
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
  });

  const getSingleUser = catchAsyncError(async (req, res, next) => {
    const { userId } = req.params; 

    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return next(new errorHandler('User not found', 404));
      }
  
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        user,
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
  });

  const deleteUser = catchAsyncError(async (req, res, next) => {
    const { userId } = req.params; 
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return next(new errorHandler('User not found', 404));
      }
  
      await user.destroy();
  
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      return next(new errorHandler(error, 500));
    }
  });
  
  const logout = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
      });
  });

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    logout
};
