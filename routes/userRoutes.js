const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post( '/signup', [ 
    body('username').not().isEmpty(), 
    body('password').isLength({ min: 6 }), 
    body('phoneNumber').not().isEmpty(), 
], authController.userSignUp );

router.post( '/signin', [ 
    body('password').exists(), 
], authController.userSignIn );

router.post( '/seller/signup', [ 
    body('sellerName').not().isEmpty(), 
    body('phoneNumber').not().isEmpty(), 
    body('password').isLength({ min: 6 }), 
    body('storeName').not().isEmpty(), 
    body('commercialRecord').not().isEmpty(), 
    body('country').not().isEmpty(), 
    body('city').not().isEmpty(), 
    body('area').not().isEmpty(), 
    body('location.coordinates').isArray({ min: 2, max: 2 }), 
], authController.sellerSignUp ); 

router.post( '/seller/signin', [ 
    body('phoneNumber').not().isEmpty(), 
    body('password').exists(), ], 
authController.sellerSignIn );

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUserInfo);
router.post('/forgot-password', userController.forgotPassword);
router.get('/user/:id/orders', userController.getUserOrders);
router.get('/user/:id/cars', userController.getUserCars);

router.post('/refresh-token', authController.refreshToken);

module.exports = router;
