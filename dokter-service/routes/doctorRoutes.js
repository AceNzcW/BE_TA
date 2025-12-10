const express = require('express');
const router = express.Router();
const doctorContorller = require('../controllers/doctorController');

router.post('/', doctorContorller.createDoctor);
router.get('/', doctorContorller.getDoctors);
router.get('/:id', doctorContorller.getDoctorById)
router.delete('/:id', doctorContorller.deleteDoctor);
router.put('/:id', doctorContorller.updateDoctor);

module.exports = router;
