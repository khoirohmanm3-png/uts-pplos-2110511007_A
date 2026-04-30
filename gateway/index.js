const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Penting agar Gateway bisa membaca body JSON dari Postman

const PORT = 3000;

// --- ROUTE ABSENSI & CUTI ---
app.post('/attendance', async (req, res) => {
    try {
        // Meneruskan data (employee_id, status, tanggal) ke Attendance Service (Port 5002)
        const response = await axios.post('http://localhost:5002/attendance', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: "Attendance Service sedang tidak aktif" }
        );
    }
});

// --- ROUTE AMBIL DATA (Untuk Cek di Postman) ---
app.get('/attendance', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5002/attendance');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data dari database" });
    }
});

// --- ROUTE EMPLOYEE (Laravel) ---
app.get('/employees', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8000/api/employees');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Employee Service (Laravel) mati" });
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway aktif di http://localhost:${PORT}`);
});