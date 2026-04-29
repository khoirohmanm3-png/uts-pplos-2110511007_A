const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/employees', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));
app.use('/attendance', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

app.listen(3000, () => console.log('API Gateway (Port 3000) AKTIF'));