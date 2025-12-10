const queue = require("../models/queue");

exports.resetQueue = async (req, res) => {
    try{
        await queue.resetNumber();
        res.json({ message: "Nomor antrean berhasil di reset kink!!"});
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};