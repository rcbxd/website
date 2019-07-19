var express = require('express');
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

var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

app.set('views', path.join(__dirname, '/'));
app.use('/static/', express.static('static'));
app.set('view engine', 'pug');
app.get('/blog/article/:id/', (req, res) => {
    console.log(`user viewing ${req.params.id}`)
    con.query("SELECT * FROM article WHERE id = " + req.params.id, (err, result, fields) => {
        if (err) {
            throw err
        }
        res.render('routes/article', {
            post: result[0]
        })
    })

});

app.get('/blog/', (req, res) => {
    con.query("SELECT * FROM article ORDER BY date DESC", (err, result, fields) => {
        if (err) {
            throw err
        }
        res.render('routes/blog', {
            months: months,
            posts: result.slice(0, 10)
        })
    })

})

app.get('/', (req, res) => {
    res.render('routes/index');
})

app.listen('8000', () => {
    console.log('listening on port 8000')
})