const { body } = require('express-validator');

exports.validateCar = [
    body('carType').trim().not().isEmpty().withMessage('Car type is required'),
    body('carCategory').trim().not().isEmpty().withMessage('Car category is required'),
    body('carModel').trim().not().isEmpty().withMessage('Car model is required'),
    body('vin').trim().not().isEmpty().withMessage('VIN is required')
        .isLength({ min: 11, max: 17 }).withMessage('VIN must be between 11 and 17 characters'),
    body('logoImage').trim().not().isEmpty().withMessage('Car type is required')
];
