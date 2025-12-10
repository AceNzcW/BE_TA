require('dotenv').config();
const booking = require('../models/booking');
const queue = require('../models/queue');
const axios = require('axios');

exports.createBooking = async(req, res) => {
    const {patient_name, patient_contact, doctor_id, appointment_date} = req.body;
    if(!patient_name || !doctor_id || !appointment_date){
        return res.status(400).json({error: 'patient_name, doctor_id & appointment_date are required'});
    }
    
    console.log("DOCTOR_SERVICE_URL = ", process.env.DOCTOR_SERVICE_URL);

    try {
        const doctorResponse = await axios.get(`${process.env.DOCTOR_SERVICE_URL}/doctors/${doctor_id}`);
        console.log("doctor response full:", doctorResponse.data);

        if(!doctorResponse.data || Object.keys(doctorResponse.data).length === 0){
            return res.status(404).json({error : 'Doctor not found'});
        }
        const doctor = doctorResponse.data;

        const last = await queue.getLastNumber();
        const nextNumber = last.rows[0].last_number + 1;

        await queue.updateNumber(nextNumber);
    
        const result = await booking.create(patient_name, patient_contact, doctor_id, appointment_date, nextNumber);
        const newBooking = result.rows[0];

        console.log("sending notify payload:", {
            doctorEmail: doctor.email, appointment_date
        });

    try{
        const notifyRes = await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/notify`,{
            doctorEmail: doctor.email, appointment_date,
        });
        console.log("Notification service response", notifyRes.data);
    }catch(notifyErr){
        console.error("Failed to send notifcation", notifyErr.message);
    }
     
        res.status(201).json(newBooking);
    }catch (err){
        console.error("booking create error:", err);
        res.status(500).json({ error: err.message});
    }
};

exports.getBookings = async (_req, res) => {
    try{
        const result = await booking.getAll();

        const bookingsWithDoctor = await Promise.all(result.rows.map(async(row) => {
            try{
                const doctorRes = await axios.get(`${process.env.DOCTOR_SERVICE_URL}/doctors/${row.doctor_id}`);
                return {
                    id: row.id,
                    nama_pasien: row.patient_name,
                    dokter: doctorRes.data.name,
                    tanggal: row.appointment_date,
                    status: row.status,
                    queue_number: row.queue_number
                };
            } catch(err) {
                console.error(`Gagal ambil dokter ID ${row.doctor_id}`, err.message);
                return{
                    id: row.id,
                    nama_pasien: row.patient_name,
                    dokter: '[Data dokter tidak ditemukan]',
                    tanggal: row.appointment_date
                };
            }
        }));
        res.json(bookingsWithDoctor);
    }catch(err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};

exports.updateBooking = async (req, res) => {
    const {id} = req.params;
    const {patient_name, patient_contact, doctor_id, appointment_date} = req.body;

    try{
        const result = await booking.update(id, patient_name, patient_contact, doctor_id, appointment_date);
        if (result.rows.length === 0){
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(result.rows[0]);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    const {id} = req.params;

    try{
        const result = await booking.remove(id);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};