const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const generatedToken = (id, email, username, role) => {

    const token = jwt.sign({id, email, username, role}, process.env.JWT_SECRET, { expiresIn: '7d' });

    return token;
}

exports.generateTokenForNewUser = (email ) => {

    const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "1d" })

    return token;
}
 
exports.getResetPasswordToken = ()=>{
    return crypto.randomBytes(32).toString("hex")
}

module.exports = generatedToken;


