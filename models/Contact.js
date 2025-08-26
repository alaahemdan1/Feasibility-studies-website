const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'يرجى إدخال الاسم']
    },
    email: {
        type: String,
        required: [true, 'يرجى إدخال البريد الإلكتروني'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'يرجى إدخال بريد إلكتروني صحيح']
    },
    phone: {
        type: String,
        required: [true, 'يرجى إدخال رقم الهاتف'],
        match: [/^[0-9]{11}$/, 'يرجى إدخال رقم هاتف صحيح']
    },
    message: {
        type: String,
        required: [true, 'يرجى إدخال رسالتك']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
