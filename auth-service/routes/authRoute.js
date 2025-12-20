const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authControllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);
router.get('/admin/dashboard', authMiddleware.verifyAdmin,(req, res) => {
    res.json({ message: `Welcome Admin ${req.user.id}` });
  });

module.exports = router;
