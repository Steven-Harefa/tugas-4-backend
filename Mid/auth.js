const Db = require('mysql')
const { rows } = require('mssql')
const Connect = Db.createConnection({

    host : 'localhost',
    user: 'root',
    port: '3306',
    database: 'data_pekerja'

})

module.exports = function(req, res, next){

    const Nama_Akun = req.headers.usr
    const Password_Akun = req.headers.psd

    Connect.query('SELECT COUNT(*) as total from akun WHERE Nama_Akun = ? AND Password_Akun = ?', [Nama_Akun, Password_Akun], function(err, rows){

        var code = Object.values(rows)

        if(code[0].total > 0){

            next()

        }

        else{

            res.send(401)

        }


    })
}