const express = require('express');
const carController = require('../controllers/carController');
const { validateCar } = require('../middlewares/carValidator');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/addCar', auth, carController.addCar);
router.get('/user/:userId', carController.getCarsByUserId);

module.exports = router;
