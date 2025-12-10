const db = require("../db");

exports.getLastNumber = () => {
    return db.query("SELECT last_number FROM queue_counter WHERE id=1");
};

exports.updateNumber =  (number) => {
    return db.query(
        "UPDATE queue_counter SET last_number = $1, update_at = NOW() WHERE id = 1", [number]
    );
};

exports.resetNumber = () => {
    return db.query(
        "UPDATE queue_counter SET last_number = 0, update_at = NOW() WHERE id = 1"
    );
}; 