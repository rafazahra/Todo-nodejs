const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser')

const app = express ();
const port = 5000;

//setting engine view bhs
app.set('view engine', 'hbs');

//setting parser data dari mysql ke appjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'My_Todo'
}); 

koneksi.connect((err) => {
    if(err) throw err;
    console.log('Koneksi Database Berhasil Disambung');
});

app.get('/', (req, res) => {
    koneksi.query('SELECT * FROM aktivitas', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs', {
            judulHalaman: 'MY-TODO',
            data: hasil
        });
    });
});

app.post('/tambahbarang', (req, res) => {
    var detailkegiatan = req.body.inputdetailkegiatan;
    var tanggal = req.body.inputtanggal;
    koneksi.query('INSERT INTO aktivitas(detail_kegiatan, Tanggal) VALUES(?, ?)',
    [ detailkegiatan, tanggal ],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});

app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
});