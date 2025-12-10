const db = require('../db');

exports.create = (name, email, specialization, schedule) => {
    return db.query('INSERT INTO doctors (name, email, specialization, schedule) VALUES (?, ?, ?, ?)', [name, email, specialization, schedule]);
};

exports.getAll = () => {
    return db.query('SELECT * FROM doctors');
};

exports.getById = (id) => {
    return db.query('SELECT * FROM doctors WHERE id = ?', [id]);
}

exports.remove = (id) => {
    return db.query('DELETE FROM doctors WHERE id = ?', [id]);
}

exports.update = async (id, name, email, specialization, schedule) => {
    const [result] = await db.query(
        'UPDATE doctors SET name = ?, email = ?, specialization = ?, schedule = ? WHERE id = ?',
        [name, email, specialization, schedule, id]
    );
    return result;
};