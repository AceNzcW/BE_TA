const express = require('express');
const axios = require('axios');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.use('/users', userRoutes)
// Middleware untuk verifikasi token via auth-service
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    // panggil auth-service untuk verifikasi
    const response = await axios.post('http://auth-service:3003/auth/verify', {}, {
      headers: { Authorization: token }
    });

    req.user = response.data.user; // decoded payload dari auth-service
    next();
  } catch (err) {
    console.error('Verify token error:', err.message);
    return res.status(403).json({ error: 'Unauthorized' });
  }
};

// Route test
app.get('/', (req, res) => {
  res.json({ message: 'User Service running' });
});

// Route protected
app.get('/admin', verifyToken, (req, res) => {
  res.json({ message: 'Hello Admin', user: req.user });
});

// Jalankan server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`User-service running on port ${PORT}`);
});
