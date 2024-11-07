const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productNameOrNumber: { type: String, required: true, trim: true }, // product name or number
    productColor: { type: String, trim: true }, // product color
    productImage: { type: String }, // URL or path to product image
    productDetails: { type: String, trim: true }, // product details
    warranty: { type: String, trim: true }, // الضمان على القطعه, e.g., "1 year"
    productStatus: { 
        type: String, 
        enum: ['new', 'used'], // Product status (new or used)
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
