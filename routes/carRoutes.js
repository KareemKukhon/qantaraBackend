const express = require('express');
const carController = require('../controllers/carController');
const { validateCar } = require('../middlewares/carValidator');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/add-car', auth, validateCar, carController.addCar);

module.exports = router;
