require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./routes/authRoute');

app.use(express.json());

app.use(cors({
  origin: [
  "https://fe-ta.vercel.app/",
  "http://localhost:3000",
  "http://192.168.100.224:3000"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/auth', authRoute);

app.listen(process.env.PORT, () => console.log(`Auth service running on port ${process.env.PORT}`));
