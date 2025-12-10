require('dotenv').config();
const express = require('express');
const app = express();
const doctorRoutes = require('./routes/doctorRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/doctors', doctorRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Doctor Service running on port ${PORT}`);
});