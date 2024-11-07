const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carType: { type: String, required: true, trim: true }, // نوع السيارة
    carCategory: { type: String, required: true, trim: true }, // فئة السيارة
    carModel: { type: String, required: true, trim: true }, // موديل السياره
    vin: { type: String, required: true, unique: true, trim: true }, // رقم الهيكل
    logoImage: { type: String }, // صورة شعار السياره, URL or path to the logo image
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
