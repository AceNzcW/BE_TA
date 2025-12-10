require('dotenv').config();
const express = require('express');
const app = express();
const bookingRoute = require('./routes/bookingRoute');
const queueRoute = require('./routes/queueRoute');
const cors = require('cors');
const pool = require('./db');

console.log("DOCTOR_SERVICE_URL:", process.env.DOCTOR_SERVICE_URL);

app.use(cors());
app.use(express.json());
app.use('/bookings', bookingRoute);

(async () => {
    try{
        const client = await pool.connect();
        console.log("Connect to postgreSQL");
        client.release();
    } catch (err) {
        console.error("Database connection error:", err.massage);
    }
})();

app.use('/queue', queueRoute);

const PORT = process.env.PORT || 3002;
app.listen(3002, () => console.log('Booking service running on port 3002'));