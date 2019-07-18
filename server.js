var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: '192.168.64.2',
    user: 'rcbxd',
    password: 'tester',
    database: 'blog_base'
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.set('views', path.join(__dirname, '/'));
app.use('/static/', express.static('static'));
app.set('view engine', 'pug');
app.get('/blog/:id/', (req, res) => {
    con.query("SELECT * FROM article WHERE id = 1", (err, result, fields) => {
        if (err) {
            throw err
        }
        // res.render('blog/blog/article', {
        // post: result[0]
        //})
    })

});

app.get('/blog/', (req, res) => {
    con.query("SELECT * FROM article", (err, result, fields) => {
        if (err) {
            throw err
        }
        res.render('routes/blog', {
            posts: result
        })
    })

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen('8000', () => {
    console.log('listening on port 8000')
})