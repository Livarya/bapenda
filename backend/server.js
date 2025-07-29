require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const path = require('path');
const superadminRoutes = require('./routes/superadmin');
const { initWhatsApp } = require('./config/whatsapp');

const app = express();

// Connect Database
connectDB();

// Middleware


// Middleware CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://dafe096712ae.ngrok-free.app' // frontend dari ngrok
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // kalau pakai cookie/token
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Inisialisasi WhatsApp client
console.log('Menginisialisasi WhatsApp client untuk notifikasi...');
initWhatsApp();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/laporan', require('./routes/laporan'));
app.use('/api/superadmin', superadminRoutes);
app.use('/api/admin', require('./routes/admin'));

// Listen on all network interfaces (bisa diakses dari HP)
const PORT = 5000;
const HOST = '0.0.0.0'; // Penting agar bisa diakses dari HP atau lewat Ngrok
app.listen(PORT, HOST, () => {
  console.log(`✅ Server started at http://${HOST}:${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR HANDLER:', err.stack || err);
  res.status(500).json({ msg: 'Server error', error: err.message });
});
