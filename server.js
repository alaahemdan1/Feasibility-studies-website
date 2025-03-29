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

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/economic-vision', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
}).catch(err => {
    console.error('خطأ في الاتصال بقاعدة البيانات:', err);
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form route
app.post('/api/contact', async (req, res) => {
    try {
        // Handle contact form submission (to be implemented)
        res.json({ success: true, message: 'تم استلام رسالتك بنجاح' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'حدث خطأ في إرسال الرسالة' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
