const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(403).json({ error: 'No token provided'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err)return res.status(403).json({ error: 'Invalid token' });

        req.user = user;
        next();
    });
};

exports.verifyAdmin = (req, res, next) => {
    exports.verifyToken(req, res, () => {
        if (req.user.role !== "admin"){
            return res.status(403).json({ error: "Membutuhkan akses admin"});
        }
        next();
    });
};