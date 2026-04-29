const express = require('express');
const app = express();

app.get('/auth/github', (req, res) => {
    res.json({ message: "Redirecting to GitHub OAuth... (NIM Akhiran 7)" });
});

app.listen(3001, () => console.log('Auth Service (Port 3001) AKTIF'));