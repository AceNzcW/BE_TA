const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

router.post('/reset', queueController.resetQueue);

module.exports = router;