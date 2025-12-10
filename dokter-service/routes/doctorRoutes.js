const express = require('express');
const router = express.Router();
const doctorContorller = require('../controllers/doctorController');
const { verifyToken, verifyAdmin } = require('../middleware/doctorMiddleware');

router.post('/', verifyToken,doctorContorller.createDoctor);
router.get('/', doctorContorller.getDoctors);
router.get('/:id', doctorContorller.getDoctorById)
router.delete('/:id', verifyAdmin,doctorContorller.deleteDoctor);
router.put('/:id', verifyAdmin,doctorContorller.updateDoctor);

module.exports = router;
