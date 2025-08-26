const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/economic-vision', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
}).catch(err => {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
});

// Define a Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

// Create a Model
const ContactMessage = mongoose.model('ContactMessage', contactSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Basic validation
        const errors = {};
        if (!name) errors.name = 'يرجى إدخال الاسم';
        if (!email) errors.email = 'يرجى إدخال البريد الإلكتروني';
        if (!phone) errors.phone = 'يرجى إدخال رقم الهاتف';
        if (!message) errors.message = 'يرجى إدخال رسالتك';

        // Email format validation
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email && !emailRegex.test(email)) {
            errors.email = 'يرجى إدخال بريد إلكتروني صحيح';
        }

        // Phone format validation
        const phoneRegex = /^[0-9]{11}$/;
        if (phone && !phoneRegex.test(phone)) {
            errors.phone = 'يرجى إدخال رقم هاتف صحيح';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        // Store the message in MongoDB
        const newMessage = new ContactMessage({ name, email, phone, message });
        await newMessage.save();

        res.json({ success: true, message: 'تم استلام رسالتك بنجاح' });
    } catch (error) {
        console.error('❌ خطأ عند إرسال الرسالة:', error);
        res.status(500).json({ success: false, message: 'حدث خطأ في إرسال الرسالة' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
});
