const exprees = require('express')
const cors = require('cors')
const authmid = require('../Tugas 4_BackEnd/Mid/auth.js')

const app = exprees()
app.use(exprees.urlencoded({extended : true}))
app.use(exprees.json())
app.use(cors())

const Db = require('mysql')
const { rows } = require('mysql')
const Connect = Db.createConnection({

    host : 'localhost',
    user: 'root',
    port: '3306',
    database: 'data_pekerja'

})

Connect.connect(function(err){

    if(!err){
        console.log('Berhasil Konek Ke Database')
    }

    else{
        console.log('Gagal Konek Ke Database')
    }

})

app.post('/User', authmid, (req, res) => {

    var N = req.body.Nama_Akun
    var P = req.body.Password_Akun

    Connect.query('INSERT INTO akun(Nama_Akun, Password_Akun) VALUES (?, ?)', [N, P], function(err){

        if(err){

            res.send(500)
            return
    
        }
    
        else{
    
            Connect.query("SELECT ID_Akun, Nama_Akun FROM akun ORDER BY ID_Akun DESC LIMIT 1", (err, rows, field) => {

                res.send(rows)
        
            })
    
        }

    })

})

app.post('/todo', authmid, function(req, res){
    
    var Data_Nama = req.body.Data
    var Perintah = "INSERT INTO data_pribadi (Nama) VALUES ('"+ Data_Nama +"')"

    Connect.query(Perintah, Data_Nama, function(err){
        if(err){
            throw err;
        }   
    })

    res.end()
    
})

app.get('/todo', authmid, function(req, res){

    Connect.query('SELECT * FROM data_pribadi', (err, rows, fields)=>{

        if(!err){
            res.send(rows)
        }

        else{
            console.log(err)
        }

    })
})

app.get('/User', authmid, (req, res) => {

    Connect.query('SELECT ID_Akun, Nama_Akun from akun', (err, rows, field) => {

        if(!err){

            res.send(rows)

        }

        else{

            console.log(err)

        }

    })

})

app.delete('/User/:ID_Akun', authmid, (req, res) => {

    Connect.query("DELETE from akun WHERE ID_Akun = '" + req.params.ID_Akun + "'",(err, rows, field) => {

        if(!err){

            res.send("Berhasil Dihapus")

        }

        else{

            console.log(err)

        }
    
    })

})

app.listen(3000, () => {

    console.log("Server Aktif")

})