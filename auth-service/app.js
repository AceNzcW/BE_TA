require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authroutes');

app.use(express.json());

app.use(cors({
  origin: [
  "http://localhost:3000",
  "http://192.168.100.224:3000"],
  credentials: true
}));

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => console.log(`Auth service running on port ${process.env.PORT}`));
