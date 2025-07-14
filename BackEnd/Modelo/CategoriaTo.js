const db = require('../Config/Database');
 
const CategoriaTo = {
 
    obternerTodas: (callback) => {
        const sql = "SELECT * FROM categoria"
        db.query(sql, (err, data) => {
            if (err) return callback(err, null)
            callback(null, data)
        })
    }
}
 
module.exports = CategoriaTo;