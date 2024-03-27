const { User, UserProfile } = require("../models"); // Adjust the path based on your project structure
const bcrypt = require("bcryptjs");
const generatedToken = require("../utils/jwtToken");
const generateTokenForNewUser = require("../utils/jwtToken")
const setTokenCookie = require("../utils/sendToken");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const getResetPasswordToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

 const ClientID = "http://localhost:3000"; // will work on it


const createUser = catchAsyncError(async (req, res, next) => {
  const { username, email, age, gender, role, password, status } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return next(new errorHandler("User with this email already exists", 400));
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

    const token = generatedToken(createUser.id, createUser.email, createUser.username, createUser.role);
    setTokenCookie(res, token);

    user.loginToken = token;
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user, 
      token,
  });
  } catch (error) {
    return next(new errorHandler(error, 500));
  }
});


const loginUser = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({
      where: { email },
    });

    if (!userData) {
      return next(new errorHandler("Invalid Email", 400));
    }

    const passwordMatches = await bcrypt.compare(password, userData.password);

    if (!passwordMatches) {
      return next(new errorHandler("Invalid Password", 400));
    }

    const token = generatedToken(userData.id, userData.email, userData.username, userData.role);
    setTokenCookie(res, token);

    userData.loginToken = token;
    await userData.save();

    const userDataNew = await User.findOne({
      where: { id: userData.id },
    });

    const user = {
      id: userDataNew.id,
      username: userDataNew.username,
      role: userDataNew.role,
      email: userDataNew.email,
      age: userDataNew.age,
      gender: userDataNew.gender,
      password: userDataNew.password,
      token: userDataNew.loginToken,
      status: userDataNew.status,
      createdAt: userDataNew.createdAt,
      updatedAt: userDataNew.updatedAt,
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
      token,
    });
  } catch (error) {
    return next(new errorHandler(error, 500));
  }
});


const createNewUser = catchAsyncError(async (req, res, next) => {
  
  const { email, role, status } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return next(new errorHandler("User with this email already exists", 400));
    }


    const user = await User.create({
      email,
      role,
      status,
    });

    const tokenForNewUser = generateTokenForNewUser(email)

    // email setup 

    const NewUserTokenUrl = `${ClientID}/create/new/user/${tokenForNewUser}/${user.id}`

    const message = `Please, click the link below to Get the access for the role: ${role} :- \n\n  ${NewUserTokenUrl} \n\n This link will expire in 1 day.`;


try {

     const response = await sendEmail({
        subject: "Access for Times Education Platform",
        email: user.email,
        payload: message,
     })

      if (response) {
        res.status(200).json({
        success: true,
        message: "check your email",
      });

    } else {
      res.status(401).json({
        success: true,
        message: "Error try again",
      });

    }

  } catch (error) {
    return next(new errorHandler(error, 500));
  }
});


const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) return "email not found";

  const resetToken = getResetPasswordToken();


  const resetTokenUrl = `${ClientID}/reset/password/${resetToken}/${user.id}`;

  const message = `Please, click the link below to reset your password :- \n\n  ${resetTokenUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    const response = await sendEmail({
      subject: "Reset Password",
      email: user.email,
      payload: message,
    });

    if (response) {
      res.status(200).json({
        success: true,
        message: "check your email",
      });
    } else {
      res.status(401).json({
        success: true,
        message: "Error try again",
      });
    }
  } catch (error) {
    console.log(error);
  }
});


const ResetPassword = catchAsyncError(async (req, res, next) => {
  const { newPassword, id } = req.body;

  console.log(newPassword, id);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.update({ password: hashedPassword }, { where: { id } });

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});


const adminRequestUserUpdate = catchAsyncError(async (req, res, next) => {

  console.log(req.body, "new");
  console.log(req.params);
  const { id } = req.params;
  const { username, email, age, gender,  password } = req.body;

  try {
    const user = await User.findByPk(id);

    console.log(user, "user 1");

    if (!user) {
      return next(new errorHandler("User not found", 404));
    }

    // If the email is being updated, check for uniqueness
    if (email && email !== user.email) {
      const duplicateEmail = await User.findOne({
        where: { email },
      });

      if (duplicateEmail) {
        return next(new errorHandler("Email is already in use", 400));
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Update user information
    user.username = username;
    user.email = email || user.email;
    user.age = age ;
    user.gender = gender;
    user.role =  user.role;
    user.status =  user.status;
    user.password = hashedPassword


    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: user,
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
      return next(new errorHandler("User not found", 404));
    }

    // If the email is being updated, check for uniqueness
    if (email && email !== user.email) {
      const duplicateEmail = await User.findOne({
        where: { email },
      });

      if (duplicateEmail) {
        return next(new errorHandler("Email is already in use", 400));
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
      message: "User updated successfully",
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
      message: "All users retrieved successfully",
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
      return next(new errorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
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
      return next(new errorHandler("User not found", 404));
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new errorHandler(error, 500));
  }
});

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

module.exports = {
  createUser,
  loginUser,
  createNewUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  logout,
  forgetPassword,
  ResetPassword,
  adminRequestUserUpdate
};



// const createNewUser = catchAsyncError(async (req, res, next) => {
//   2;

//   const { username, email, age, gender, role, password, status } = req.body;

//   try {
//     const existingUser = await User.findOne({
//       where: { email },
//     });

//     if (existingUser) {
//       return next(new errorHandler("User with this email already exists", 400));
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user
//     const users = await User.create({
//       username,
//       email,
//       age,
//       gender,
//       role,
//       password: hashedPassword,
//       status,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       users: users,
//     });
//   } catch (error) {
//     return next(new errorHandler(error, 500));
//   }
// });