const jwt = require('jsonwebtoken');

const generatedToken = (id, email, username, role) => {

    const token = jwt.sign({id, email, username, role}, process.env.JWT_SECRET, { expiresIn: '7d' });

    return token;
}

module.exports = generatedToken;