const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/refreshToken');

const generateAccessToken = (user) => {
    return jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = async (user) => {
    const token = crypto.randomBytes(40).toString('hex');
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 days expiry

    const refreshToken = new RefreshToken({
        token,
        userId: user.id,
        expiryDate
    });

    await refreshToken.save();
    return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
