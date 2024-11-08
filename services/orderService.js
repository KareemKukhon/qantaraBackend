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
