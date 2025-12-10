require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.USER_DB_USER || 'postgres',
    host: process.env.USER_DB_HOST || 'user-db',
    database: process.env.USER_DB_NAME || 'user_db',
    password: process.env.USER_DB_PASSWORD || 'jawahama123',
    port: process.env.USER_DB_PORT || 5432,
});

module.exports = pool;