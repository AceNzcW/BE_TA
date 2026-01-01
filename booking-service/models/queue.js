exports.getGlobalNextNumber = (date) => {
    return db.query(
        `INSERT INTO queue_counter (doctor_id, booking_date, last_number)
         VALUES ($1, $2, 1) 
         ON CONFLICT (doctor_id, booking_date) 
         DO UPDATE SET last_number = queue_counter.last_number + 1
         RETURNING last_number`,
        [0, date] // $1 diisi 0, $2 diisi date. Sekarang pas (2 parameter).
    );
};