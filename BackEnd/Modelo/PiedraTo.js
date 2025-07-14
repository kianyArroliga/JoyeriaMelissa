const db = require('../Config/Database');

const PiedraTo = {

    obternerTodas: (callback) => {
        const sql = "SELECT * FROM piedra"
        db.query(sql, (err, data) => {
            if (err) return callback(err, null)
            callback(null, data)
        })
    }
}

module.exports = PiedraTo;