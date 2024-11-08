const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'cancelled'], // حالة الطلب
        default: 'pending',
    },
    orderPrice: { type: Number, }, // سعر الطلب
    orderDate: { type: Date, default: Date.now }, // تاريخ الطلب
    productName: { 
        type: String, 
    }, // id القطعه
    productColor: { type: String },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,  // لا يمكن أن يكون فارغ��ا
    }, // user id
    carId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Car', 
    }, // car id
    warrantyDuration: { type: String }, // مدة الضمان
    images: [{ type: String, trim: true }], // الصور, array of image URLs
    color: { type: String, trim: true }, // اللون
    notes: { type: String, trim: true }, // الملاحظات
    isPaid: { type: Boolean, default: false } // هل تم الدفع
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
