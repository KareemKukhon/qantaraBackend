const Product = require('../models/product');
const Order = require('../models/order');

// Fetch products based on carId
exports.fetchProductsByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        // Find orders that match the given carId
        const orders = await Order.find({ carId });
        const orderIds = orders.map(order => order._id);

        // Find products that are associated with these orderIds
        const products = await Product.find({ orderId: { $in: orderIds } });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Existing functions...
exports.fetchProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addProduct = async (req, res) => {
    const { productColor, productImage, productDetails, warranty, productStatus, orderId } = req.body;
    try {
        const newProduct = new Product({
            productColor,
            productImage,
            productDetails,
            warranty,
            productStatus,
            productPrice,
            orderId
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
