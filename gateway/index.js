const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// --- ROUTE ABSENSI ---

// 1. Ambil Semua Data (GET)
app.get('/attendance', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5002/attendance');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Attendance Service mati" });
    }
});

// 2. Tambah Data Baru (POST)
app.post('/attendance', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5002/attendance', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengirim data ke Attendance Service" });
    }
});

// 3. Hapus Data (DELETE)
app.delete('/attendance/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.delete(`http://localhost:5002/attendance/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus data" });
    }
});

// --- ROUTE EMPLOYEE (LARAVEL) ---
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