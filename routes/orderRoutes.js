const express = require('express');
const orderController = require('../controllers/orderController');
const { validateOrder } = require('../middlewares/orderValidator');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/add-order', auth, validateOrder, orderController.addOrder);
router.get('/byBrand', orderController.getOrdersByCarCompanies);
router.post('/addOrder', orderController.addOrder);
module.exports = router;
