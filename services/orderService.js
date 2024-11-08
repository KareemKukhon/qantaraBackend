// services/orderService.js
const Order = require('../models/order');
const Car = require('../models/car');

const getOrdersByCarCompanies = async (carCompanies) => {
  try {
    // Step 1: Find Car IDs that match the company names
    const cars = await Car.find({ companyName: { $in: carCompanies } });
    const carIds = cars.map((car) => car._id);

    // Step 2: Fetch Orders with the matching car IDs
    const orders = await Order.find({ carId: { $in: carIds } })
      .populate('productId', 'productName')  // Only populates specific fields as needed
      .populate('userId', 'username')
      .populate('carId', 'companyName model year'); // Populates specific Car fields

    return orders;
  } catch (error) {
    throw new Error('Error fetching orders by car companies: ' + error.message);
  }
};

module.exports = {
  getOrdersByCarCompanies,
};


const addOrder = require('../Dtos/addOrder');

exports.addOrder = async (req, res) => {
    const { carId, productName, productColor, notes } = req.body;

    try {
        const newOrder = new addOrder({
            carId,
            productName,
            productColor,
            notes,
        });

        const savedOrder = await newOrder.save();
        return res.status(201).json({ message: 'Order added successfully', order: savedOrder });
    } catch (error) {
        console.error('Error adding order:', error);
        return res.status(500).json({ message: 'Failed to add order', error: error.message });
    }
};
