const errorHandler = require('../utils/errorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const jwt  = require("jsonwebtoken");
const { User } = require('../models'); 

const isAuthenticatedUser = catchAsyncError(async(req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if(!token) {
        return next(new errorHandler("Please login to access this resource", 401))
    }   

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: { id: decodedData.id },
            attributes: ['id', 'email', 'username', 'role'],
        });

        if(!user) {
            return next(new errorHandler("User not found", 401))
        }

        const userData = {
            userid: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        }

        req.user = userData
        next();

    } catch(error) {
        return next(new errorHandler(error, 403))
    }
});

module.exports = {
    isAuthenticatedUser
}
