const db = require('../db');
const pool = require('../db')

exports.findByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM public.users WHERE username = $1', [username]);
    return result.rows[0];
};