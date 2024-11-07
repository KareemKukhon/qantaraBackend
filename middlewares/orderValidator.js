const { body } = require('express-validator');

exports.validateOrder = [
    body('orderPrice').isFloat({ gt: 0 }).withMessage('Order price must be greater than 0'),
    body('productId').isMongoId().withMessage('Product ID must be a valid Mongo ID'),
    body('carId').isMongoId().withMessage('Car ID must be a valid Mongo ID'),
    body('warrantyDuration').notEmpty().withMessage('Warranty duration is required'),
    body('images').isArray().withMessage('Images must be an array of URLs'),
    body('color').notEmpty().withMessage('Color is required'),
    body('notes').optional().trim().isString().withMessage('Notes must be a string'),
    body('isPaid').isBoolean().withMessage('isPaid must be a boolean value')
];
