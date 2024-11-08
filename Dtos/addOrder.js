const mongoose = require('mongoose');

const addOrderSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }, // Reference to Car
    productName: { type: String, required: true, trim: true }, // Product name
    productColor: { type: String, required: true, trim: true }, // Product color
    notes: { type: String, trim: true } // Optional notes
}, { timestamps: true });

module.exports = mongoose.model('addOrder', addOrderSchema);
