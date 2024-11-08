const Order = require('../models/order');
const Product = require('../models/product'); // Assuming you have a Product model
const Car = require('../models/car');
// const { validationResult } = require('express-validator');
const orderService = require('../services/orderService');

// Add Order
exports.addOrder = async (req, res, next) => {
  const { carId, productName, productColor, notes } = req.body;

  try {
      const newOrder = new Order({
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


exports.getOrdersByCarCompanies = async (req, res) => {
    const { carCompanies } = req.body; // Expecting car companies list in request body
    if (!Array.isArray(carCompanies) || carCompanies.length === 0) {
      return res.status(400).json({ message: 'Car companies list is required.' });
    }
  
    try {
      const orders = await orderService.getOrdersByCarCompanies(carCompanies);
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };