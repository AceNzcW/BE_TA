require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool({
    host: process.env.PGHOST || 'booking-db',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'jawahama123',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'clinic_booking',
});

module.exports = pool;