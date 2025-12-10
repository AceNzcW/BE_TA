require('dotenv').config();
const Doctor = require('../models/doctor');

exports.createDoctor = async (req, res) => {
    const {name, email, specialization, schedule} = req.body;

    if(!name|| !email || !specialization || !schedule){
        return res.status(400).json({ error: "name, email, specialization, and schedule are required"});
    }

    try{
        const result = await Doctor.create(name, email, specialization, schedule);
        res.status(201).json({
            id: result.insertId,
            name,
            email,
            specialization,
            schedule
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDoctors = async (req, res) => {
    try{
        const [rows] = await Doctor.getAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDoctorById = async(req,res) => {
    const{id} = req.params;
    try{
        console.log("Fetching doctor ID:", id);
        const [rows] = await Doctor.getById(id);
        console.log("Result", rows);
        if (rows.length === 0){
            return res.status(404).json({ error: 'Doctor Not Found'});
        }

        const doctor = rows[0];
        res.json({
            id: doctor.id,
            name: doctor.name,
            email: doctor.email,
            specialization: doctor.specialization,
            schedule: doctor.schedule
        });
    }catch(err){
        console.error("Doctor getById error:", err);
        res.status(500).json({ error: err.message });
    }
}

exports.deleteDoctor = async (req, res) => {
    const {id} = req.params;

    try{
        const result = await Doctor.remove(id);
        if(result.affectedRows === 0) {
            return res.status(404).json({ error: 'Doctor Not found'});
        }
        res.json({ message: 'Doctor delete successfully' });
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { name, email, specialization, schedule } = req.body;

    try{
        const result = await Doctor.update(id, name, email, specialization, schedule);
        if(result.affectedRows ===0 ){
            return res.status(404).json({ error: 'Doctor Not Found' });
        }
        res.json({ id, name, email, specialization, schedule });
    }catch (err){
        res.status(500).json({ error: err.message });
    }
}