const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var app = express();
const port = 1997;

var url = bodyParser.urlencoded({extended : false});

app.use(cors());
app.use(url);
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'itachi',
    password : 'itachi2',
    database : 'hotelbertasbih',
    port : 3306
})

 // LOGIN REGISTER
app.post('/login', (req,res) => {
    const { email, pass } = req.body;
    var sql = ` SELECT * FROM tableuser WHERE email='${email}' && password='${pass}'`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length == 0) {
            res.send('Your Email or Password are Incorrect!');
        }
        else if(results.length >= 1) {
            console.log(results);
            res.send(results);
        }
    })
})

app.post('/register', (req,res) => {
    const { username, email, pass, role } = req.body;
    var data = {
        username,
        email,
        password : pass,
        role
    };
    var sql = `INSERT INTO tableuser SET ?`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log('Register Success!');
        // res.send(results);
        var sql1 = `SELECT * FROM tableuser`;
        conn.query(sql1, (err, results1) => {
            if (err) throw err;
            res.send(results1)
        })
    })
})


 // GET ALL KAMAR & ALL CATEGORY
app.get('/kamar', (req,res) => {
    var sql= `SELECT * FROM tablekamar`;
    conn.query(sql, (err,results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.send(results);
    })
})

app.get('/category', (req,res) => {
    var sql= `SELECT * FROM tablecategory`;
    conn.query(sql, (err,results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.send(results);
    })
})


 // CREATE KAMAR & CATEGORY
app.post('/kamar', (req,res) => {
    const { nomorkamar, categoryid, harga } = req.body;
    var data = {
        nomorkamar,
        categoryid,
        harga
    };
    var sql = `INSERT INTO tablekamar SET ?`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log(results);
        console.log('Create Kamar Success!');
        var sql1 = `SELECT * FROM tablekamar`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.post('/category', (req,res) => {
    const { namacategory } = req.body;
    var data = {
        namacategory
    }
    var sql = `INSERT INTO tablecategory SET ?`;
    conn.query(sql, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        console.log('Create Category Success!');
        var sql1 = `SELECT * FROM tablecategory`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})


 // DELETE KAMAR & CATEGORY
app.delete('/kamar/:id', (req,res) => {
    var sql= `DELETE FROM tablekamar WHERE id=${req.params.id}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        var sql1 = `SELECT * FROM tablekamar`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.delete('/category/:id', (req,res) => {
    var sql = `DELETE FROM tablecategory WHERE id=${req.params.id}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        var sql1 = `SELECT * FROM tablecategory`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})


 //UPDATE KAMAR & CATEGORY
app.put('/kamar/:id', (req,res) => {
    const { nomorkamar, categoryid, harga } = req.body;
    var data = {
        nomorkamar,
        categoryid,
        harga
    };
    var sql = `UPDATE tablekamar SET ? WHERE id=${req.params.id}`;
    var sql1 = `SELECT * FROM tablekamar`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log(results);
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err;
            res.send(results1);
        })
    })
})

app.put('/category/:id', (req,res) => {
    const { namacategory } = req.body;
    var data = {
        namacategory
    }
    var sql = `UPDATE tablecategory SET ? WHERE id=${req.params.id}`;
    var sql1 = `SELECT * FROM tablecategory`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log(results);
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})


 // FILTER KAMAR BY CATEGORY
app.get('/filterkamar/:categoryid', (req,res) => {
    var sql = `SELECT k.*, c.namacategory as category FROM tablekamar k join tablecategory c on k.categoryid=c.id WHERE k.categoryid=${req.params.categoryid}`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})



app.listen(port, () => console.log(`App listening on port ${port}!`));