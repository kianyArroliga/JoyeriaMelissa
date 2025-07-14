const db = require('../Config/Database');

const MaterialTo = {

    obternerTodas: (callback) => {
        const sql = "SELECT * FROM material"
        db.query(sql, (err, data) => {
            if (err) return callback(err, null)
            callback(null, data)
        })
    }
}

module.exports = MaterialTo;