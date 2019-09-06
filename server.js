var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
require('dotenv').config();

var environment = {
    db_host: '192.168.64.2',
    db_user: 'rcbxd',
    db_password: 'tester',
    db: 'blog_base',
}

if (process.env.TYPE == "deploy") {
    console.log('Running the deploy version.')
    var environment = {
        db_host: 'localhost',
        db_user: 'rcbxd',
        db_password: 'gfwvm7da4d99',
        db: 'blog_base'
    }
}

app.use(express.json());
app.use(express.urlencoded());
var con = mysql.createConnection({
    host: environment.db_host,
    user: environment.db_user,
    password: environment.db_password,
    database: environment.db
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
app.use(express.urlencoded());
app.use(express.json());
app.get('/blog/article/:id/', (req, res) => {
    console.log(`user viewing ${req.params.id}`)
    con.query("SELECT * FROM article WHERE id = " + req.params.id, (err, result, fields) => {
        if (err) {
            throw err
        }
        res.render('routes/article', {
            post: result[0],
            months: months
        })
    })

});

app.post('/blog/admin/', (req, res) => {
    var email = req.body.email
    var password = req.body.pass
    con.query("SELECT * FROM admins WHERE email = '" + email + "'", (err, result, fields) => {
        if (err)
            throw err
        if (result.length == 0)
            res.render('routes/admin.pug', {
                error: 'No user exists with these credentials'
            })
        else
        if (result[0].password == password) {
            console.log('granted')
        } else
            res.render('routes/admin.pug', {
                error: 'Invalid password provided'
            })
    })
})

app.get('/blog/', (req, res) => {
    con.query("SELECT * FROM article ORDER BY date DESC", (err, result, fields) => {
        if (err) {
            throw err
        }
        res.render('routes/blog', {
            months: months,
            posts: result
        })
    })

})

app.get('/blog/admin/', (req, res) => {
    res.render('routes/admin')
})

app.get('/', (req, res) => {
    res.render('routes/index');
})

app.get('/blog/favorites/', (req, res) => {
    res.render('routes/favorites.pug')
})

app.post('/blog/post/:id/like', (req, res) => {
    var likes = 0;
    con.query('SELECT likes FROM article WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err)
            throw err;
        likes = results[0].likes + 1;
        con.query('UPDATE article SET likes = ' + likes + ' WHERE id = ' + req.params.id, (err, results, fields) => {
            if (err)
                throw err;
        })
    })
    res.json(likes)
})

app.post('/blog/post/:id/unlike/', (req, res) => {
    var likes = 0;
    con.query('SELECT likes FROM article WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err)
            throw err;
        likes = results[0].likes - 1;
        con.query('UPDATE article SET likes = ' + likes + ' WHERE id = ' + req.params.id, (err, results, fields) => {
            if (err)
                throw err;
        })
    })
    res.json(likes)
})

var listener = app.listen('8000', () => {
    console.log(`listening on port ${listener.address().port}`)
})

app.get('/blog/api/posts', cors(), (req, res) => {
    con.query('SELECT * FROM article ORDER BY date DESC', (err, result, fields) => {
        if (err)
            throw err;
        res.json(result)
    })
})

app.get('/blog/api/post/:id', cors(), (req, res) => {
    con.query('SELECT * FROM article WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err)
            throw err;
        res.json(results);
    })
})