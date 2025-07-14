const db = require('../Config/Database');
 
const TallaTo = {
 
    obternerTodas: (callback) => {
        const sql = "SELECT * FROM talla"
        db.query(sql, (err, data) => {
            if (err) return callback(err, null)
            callback(null, data)
        })
    }
}
 
module.exports = TallaTo;