const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'cancelled'], // حالة الطلب
        default: 'pending',
        required: true 
    },
    orderPrice: { type: Number, }, // سعر الطلب
    orderDate: { type: Date, default: Date.now }, // تاريخ الطلب
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    }, // id القطعه
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // user id
    carId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Car', 
        required: true 
    }, // car id
    warrantyDuration: { type: String, required: true }, // مدة الضمان
    images: [{ type: String, trim: true }], // الصور, array of image URLs
    color: { type: String, trim: true }, // اللون
    notes: { type: String, trim: true }, // الملاحظات
    isPaid: { type: Boolean, default: false } // هل تم الدفع
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
