const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Route untuk Auth Service (Login)
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5001/login', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Auth Service Down" });
    }
});

// Route untuk Attendance Service (Absensi & Cuti)
app.post('/attendance', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5002/attendance', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Attendance Service Down" });
    }
});

app.get('/attendance', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5002/attendance');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data absensi" });
    }
});

// Route untuk Employee Service (Laravel)
app.get('/employees', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8000/api/employees');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Employee Service (Laravel) Down" });
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway jalan di http://localhost:${PORT}`);
});