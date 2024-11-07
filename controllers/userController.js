const User = require('../models/user');
const Order = require('../models/order');
const bcrypt = require('bcryptjs');
const { UserDTO } = require('../Dtos/userDto');
const { validationResult } = require('express-validator');

exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error); 
    }
  };

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(new UserDTO(user));
    } catch (error) {
        next(error);
    }
};

exports.updateUserInfo = async (req, res, next) => {
    try {
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(new UserDTO(user));
    } catch (error) {
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { phoneNumber, newPassword } = req.body;
    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const salt = await bcrypt.genSalt(10);
        user.password = (newPassword);
        console.log('New Password:', newPassword); // Log the plain password
        console.log('Hashed Password:', user.password); // Log the hashed password
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};


exports.getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        if (!orders) return res.status(404).json({ error: 'No orders found for this user' });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

exports.getUserCars = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('cars');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.cars);
    } catch (error) {
        next(error);
    }
};
