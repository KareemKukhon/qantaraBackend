const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productColor: { type: String, trim: true }, // product color
    productImage: { type: String }, // URL or path to product image
    productPrice: { type: String },
    productDetails: { type: String, trim: true }, // product details
    warranty: { type: String, trim: true }, // الضمان على القطعه, e.g., "1 year"
    productStatus: { 
        type: String, 
        enum: ['new', 'used'], // Product status (new or used)
        required: true 
    },
    orderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order',
        required: true // Ensures every product is associated with an order
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
