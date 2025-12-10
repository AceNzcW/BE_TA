const db = require('../db');

exports.create = (patientName, patientContact, doctorId, appointmentDate, queue_number) => {
    const query = `
  INSERT INTO bookings (patient_name, patient_contact, doctor_id, appointment_date, queue_number) VALUES ($1, $2, $3, $4, $5) RETURNING *
`;
    return db.query(query, [patientName, patientContact || null, doctorId, appointmentDate, queue_number]);
};

exports.getAll = () => db.query('SELECT * FROM bookings ORDER BY appointment_date DESC');

exports.update = (id, patientName, patientContact, doctorId, appointmentDate) => {
  return db.query(
    'UPDATE bookings SET patient_name=$1, patient_contact=$2, doctor_id=$3, appointment_date=$4 WHERE id=$5 RETURNING *',
    [patientName, patientContact, doctorId, appointmentDate, id]
  );
};

exports.remove = (id) => {
  return db.query('DELETE FROM bookings WHERE id=$1 RETURNING *', [id]);
};