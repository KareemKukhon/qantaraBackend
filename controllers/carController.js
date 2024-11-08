const Car = require('../models/car');
const { validationResult } = require('express-validator');

// Add Car
exports.addCar = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { carType, carCategory, carModel, vin, logoImage } = req.body;

    try {
        const car = new Car({
            carType,
            carCategory,
            carModel,
            vin,
            logoImage,
            userId: req.user.id
        });

        await car.save();
        res.status(201).json({ message: 'Car added successfully', car });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ error: 'VIN already exists' });
        }
        next(error);
    }
};


// Function to get cars by userId
exports.getCarsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Fetch cars based on userId
        const cars = await Car.find({ userId }).exec();

        // Check if any cars found
        if (!cars.length) {
            return res.status(404).json({ message: 'No cars found for this user' });
        }

        res.status(200).json({ cars });
    } catch (error) {
        next(error);
    }
};
