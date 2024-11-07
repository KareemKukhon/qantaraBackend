const Order = require('../models/order');
const Product = require('../models/product'); // Assuming you have a Product model
const Car = require('../models/car');
const { validationResult } = require('express-validator');

// Add Order
exports.addOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { orderPrice, numberOfOrders, productId, carId, warrantyDuration, images, color, notes, isPaid } = req.body;

    try {
        // Check if Product exists
        // const product = await Product.findById(productId);
        // if (!product) {
        //     return res.status(404).json({ error: 'Product not found' });
        // }

        // // Check if Car exists
        // const car = await Car.findById(carId);
        // if (!car) {
        //     return res.status(404).json({ error: 'Car not found' });
        // }

        // Create new Order
        const order = new Order({
            orderPrice,
            productId,
            userId: req.user.id, // Assuming user ID is available in the request
            carId,
            warrantyDuration,
            images,
            color,
            notes,
            isPaid,
            orderStatus: 'pending'
        });

        await order.save();
        res.status(201).json({ message: 'Order added successfully', order });
    } catch (error) {
        next(error);
    }
};
