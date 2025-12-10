const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken, verifyAdmin } = require('../middleware/bookingMiddleware');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.put('/:id', verifyToken, bookingController.updateBooking);
router.delete('/:id', verifyAdmin,bookingController.deleteBooking);

module.exports = router;