const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5002;

// Konfigurasi Database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_attendance' // Sesuaikan dengan nama database kamu
});

// 1. Ambil Data
app.get('/attendance', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM attendance');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Tambah Data
app.post('/attendance', async (req, res) => {
    const { employee_id, status, tanggal } = req.body;
    try {
        await db.query('INSERT INTO attendance (employee_id, status, tanggal) VALUES (?, ?, ?)', 
        [employee_id, status, tanggal]);
        res.json({ message: "Absensi berhasil dicatat" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Hapus Data
app.delete('/attendance/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM attendance WHERE id = ?', [id]);
        res.json({ message: `Data ID ${id} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Attendance Service aktif di http://localhost:${PORT}`);
});