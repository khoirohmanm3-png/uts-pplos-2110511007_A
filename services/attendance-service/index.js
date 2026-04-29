const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'db_attendance'
});

app.get('/attendance', (req, res) => {
    res.json({ message: "Attendance Service connected to MySQL" });
});

app.listen(3002, () => console.log('Attendance Service (Port 3002) AKTIF'));