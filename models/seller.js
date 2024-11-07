const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sellerSchema = new mongoose.Schema({
    sellerName: { type: String, required: true, trim: true }, // الاسم
    phoneNumber: { type: String, required: true, unique: true }, // رقم الهاتف
    password: { type: String, required: true }, // كلمة المرور
    storeName: { type: String, required: true, trim: true }, // اسم المتجر
    commercialRecord: { type: String, required: true, unique: true }, // السجل التجاري
    country: { type: String, required: true }, // الدولة
    city: { type: String, required: true }, // المدينة
    area: { type: String, required: true }, // المنطقة
    location: { 
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude] العنوان على الخريطة
    },
}, { timestamps: true });

sellerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
sellerSchema.index({ location: '2dsphere' }); // إنشاء فهرس للموقع الجغرافي

module.exports = mongoose.model('Seller', sellerSchema);
