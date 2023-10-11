const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_KEY, { expiresIn: '20d' });
}

module.exports = { generateToken };