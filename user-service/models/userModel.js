const pool = require('../db');

exports.createAdmin = async (username, password, role = 'admin') => {
    const result = await pool.query(
        'INSERT INTO admins (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
        [username, password, role]
    );
    return result.rows[0];
};

exports.findByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
};

exports.getAllAdmins = async () => {
    const result = await pool.query('SELECT id, username, role FROM admins');
    return result.rows;
};