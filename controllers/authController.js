const User = require('../models/user');
const Seller = require('../models/seller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { UserDTO } = require('../Dtos/userDto');
const { SellerDTO } = require('../Dtos/seller');
const RefreshToken = require('../models/refreshToken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
// User Sign Up
exports.userSignUp = async (req, res, next) => {
    console.log('User Sign Up', req.body);
    const errors = validationResult(req); 
    if (!errors.isEmpty()) 
        return res.status(400).json({ errors: errors.array() });  

    try {
        const user = new User(req.body); 
        await user.save(); 
        const accessToken = generateAccessToken(user); 
        const refreshToken = await generateRefreshToken(user);
        res.status(201).json({ user: new UserDTO(user), accessToken, refreshToken });
    } 
    catch (error) { 
        next(error);
    }
};


// User Sign In
exports.userSignIn = async (req, res, next) => {
    console.log('User Sign In', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { phoneNumber, password } = req.body;
    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) return res.status(404).json({ error: 'Invalid phoneNumber Credentials' });
        console.log(user.password);
        console.log(password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ error: 'Invalid password Credentials' });

        const accessToken = generateAccessToken(user); 
        const refreshToken = await generateRefreshToken(user); 
        res.status(200).json({ accessToken, refreshToken, user });
    } catch (error) {
        next(error);
    }
};


// Seller Sign Up
exports.sellerSignUp = async (req, res, next) => { 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) 
        {return res.status(400).json({ errors: errors.array() }); }
    try { 
        const 
        { sellerName, phoneNumber, password, storeName, commercialRecord, country, city, area, location } = req.body; 
        let seller = await Seller.findOne({ phoneNumber }); 
        if (seller) 
            return res.status(400).json({ error: 'Seller already exists' }); 
        seller = new Seller({ sellerName, phoneNumber, password, storeName, commercialRecord, country, city, area, location }); 
        await seller.save(); 
        const accessToken = generateAccessToken(user); 
        const refreshToken = await generateRefreshToken(user);
    } catch (error) { 
        next(error); 
    } };

// Seller Sign In
exports.sellerSignIn = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { phoneNumber, password } = req.body;
    try {
        const seller = await Seller.findOne({ phoneNumber });
        if (!seller) return res.status(404).json({ error: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) return res.status(404).json({ error: 'Invalid Credentials' });

        const accessToken = generateAccessToken(user); 
        const refreshToken = await generateRefreshToken(user);
    } catch (error) {
        next(error);
    }
};




exports.refreshToken = async (req, res, next) => {
    const { token } = req.body;

    try {
        const refreshToken = await RefreshToken.findOne({ token }).populate('userId');
        if (!refreshToken) return res.status(403).json({ error: 'Refresh token not found' });

        if (refreshToken.expiryDate < new Date()) {
            await RefreshToken.deleteOne({ token });
            return res.status(403).json({ error: 'Refresh token expired' });
        }

        const newAccessToken = generateAccessToken(refreshToken.userId);
        const newRefreshToken = await generateRefreshToken(refreshToken.userId);

        await RefreshToken.deleteOne({ token });

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        next(error);
    }
};
