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
    if (err) console.error('Koneksi Gagal:', err.message);
    else console.log('Auth Service terhubung ke db_attendance');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) {
            res.json({ message: "Login Berhasil", user: results[0] });
        } else {
            res.status(401).json({ message: "Username atau Password salah" });
        }
    });
});

app.listen(5001, () => console.log('Auth Service running on port 5001'));