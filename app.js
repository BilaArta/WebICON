const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const path = require('path');

const app = express()

//=============== Path ======================

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public'));

//=============== Path ======================


//=============== Firebase ======================

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

//=============== Firebase ======================



//=============== Testing ======================
app.post('/testInput', (req,res) => {
    console.log(req.body);
    var data = {
        nama    : req.body.name,
        nim     : req.body.nim
    }

    db.ref('/Data/' + data.nim).update(data)
    res.redirect('/test')
})

app.get('/testView', (req,res) => {
    var ref = db.ref('/Data/');
    ref.once('value', snapshot => {
        var data = snapshot.val();
        console.log(data);
        res.render('test', {
            data : data,
            title : 'Data'
        })
    })
})

//=============== Testing ======================


//=============== Input Data ======================

app.post('/admin/inputDataPop', (req,res) => {
    var ref = db.ref('/DataPOP/' + req.body.nama);


})




//=============== Input Data ======================



//=============== View Data ======================

//-----------------------------------------------------

//=============== View Data ======================




//================= load Page ===================

app.get('/home', (req,res) => {
    res.render('home');
})

app.get('/test', (req,res) => {
    res.render('test');
})

app.get('*',(req,res) => {
    res.render('error')
})

//================= load Page ===================

app.listen(3000, () => {
    console.log('server run on port 3000');
})
