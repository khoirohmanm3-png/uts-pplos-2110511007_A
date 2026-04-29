const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ROUTE UNTUK EMPLOYEE SERVICE (LARAVEL - PORT 8000)
app.get('/employees', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8000/api/employees');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error connecting to Employee Service", error: error.message });
    }
});

// ROUTE UNTUK ATTENDANCE SERVICE (NODEJS - PORT 5002)
app.get('/attendance', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5002/attendance');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error connecting to Attendance Service", error: error.message });
    }
});

// ROUTE UNTUK AUTH SERVICE (NODEJS - PORT 5001)
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5001/login', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error connecting to Auth Service", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Gateway running on http://localhost:${PORT}`);
});