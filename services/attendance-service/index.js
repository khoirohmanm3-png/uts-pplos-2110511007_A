const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_attendance'
});

db.connect(err => {
    if (err) console.error('Gagal konek database:', err.message);
    else console.log('Attendance Service siap untuk Absensi & Cuti');
});

// 1. Fungsi untuk Mengambil Semua Data (Hadir & Cuti)
app.get('/attendance', (req, res) => {
    db.query("SELECT * FROM attendance", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. Fungsi untuk Input Absensi atau Cuti
app.post('/attendance', (req, res) => {
    const { employee_id, status, tanggal } = req.body; 
    // status bisa diisi: 'Hadir', 'Cuti', 'Sakit', atau 'Izin'
    
    const query = "INSERT INTO attendance (employee_id, status, tanggal) VALUES (?, ?, ?)";
    db.query(query, [employee_id, status, tanggal], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ 
            message: `Data ${status} berhasil dicatat!`, 
            id: result.insertId 
        });
    });
});

app.listen(5002, () => console.log('Attendance Service jalan di port 5002'));