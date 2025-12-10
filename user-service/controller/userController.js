const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const {username, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.createAdmin(username, hashedPassword);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.getAdmins = async (req, res) => {
    try{
        const admins = await User.getAllAdmins();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};