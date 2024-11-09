const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for fetching and adding products
router.get('/', productController.fetchProducts);
router.get('/car/:carId', productController.fetchProductsByCarId); // New route
router.post('/addProduct', productController.addProduct);

module.exports = router;
