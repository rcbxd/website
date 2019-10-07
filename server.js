var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
require('dotenv').config();

var db_config = {
    host: 'localhost',
    user: 'rcbxd',
    password: 'tester',
    database: 'blog_base',
}

if (process.env.DEPLOY == "true") {
    console.log('Running the deploy version.')
    var db_config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB
    }
}

app.use(express.json());
app.use(express.urlencoded());
var con = mysql.createConnection(db_config)

function throwRender500Error(res, blog = false) {
    res.status(500);
    if (!blog) {
        res.render('routes/error-regular.pug', {
            title: 'This is A Server Error',
            error_code: '500'
        })
    } else {
        res.render('routes/error-blog.pug', {
            title: 'This is A Server Error',
            error_code: '500'
        })
    }
}

con.connect(function (err) {
    if (err) console.log(`Database error: ${err}`);
    console.log("Connected!");
});

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.set('views', path.join(__dirname, '/'));
app.use('/static/', express.static('static'));
app.set('view engine', 'pug');
app.use(express.urlencoded());
app.use(express.json());
app.get('/blog/article/:id/', (req, res) => {
    console.log(`user viewing ${req.params.id}`)
    con.query("SELECT * FROM article WHERE id = " + req.params.id, (err, result, fields) => {
        if (err) {
            throwRender500Error(res, true)
        } else {
            var post = result[0];
            con.query("SELECT * FROM comments WHERE post = " + req.params.id + " ORDER BY id DESC", (err, result, fields) => {
                if (err) {
                    throwRender500Error(res, true)
                } else {
                    res.render('routes/article', {
                        post: post,
                        months: months,
                        comments: result,
                    })
                }
            })
        }
    })

});

app.post('/blog/admin/', (req, res) => {
    var email = req.body.email
    var password = req.body.pass
    con.query("SELECT * FROM admins WHERE email = '" + email + "'", (err, result, fields) => {
        if (err)
            throwRender500Error(res, true)
        else if (result.length == 0)
            res.render('routes/admin.pug', {
                error: 'No user exists with these credentials'
            })
        else {
            if (result[0].password == password) {
                console.log('granted')
            } else
                res.render('routes/admin.pug', {
                    error: 'Invalid password provided'
                })
        }

    })
})

app.get('/blog/', (req, res) => {
    con.query("SELECT * FROM article ORDER BY date DESC", (err, result, fields) => {
        if (err) {
            throwRender500Error(res, true)
        } else {
            res.render('routes/blog', {
                months: months,
                posts: result
            })
        }
    })

})

app.get('/blog/admin/', (req, res) => {
    res.render('routes/admin')
})

app.get('/', (req, res) => {
    con.query("SELECT * FROM article ORDER BY date DESC", (err, result, fields) => {
        if (err) {
            throwRender500Error(res, true)
        } else {
            res.render('routes/index', {
                posts: result
            });
        }
    })
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

app.post('/blog/post/:id/comment/', (req, res) => {
    var name = req.body.name;
    var comment = req.body.body;
    con.query("INSERT INTO comments (name, body, post) VALUES ('" + name + "', '" + comment + "', " + req.params.id + ")", (err, results, fields) => {
        if (err) {
            throwRender500Error(res, true);
            res.send('Error')
        }
    })
    res.send('Done')
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

app.get('/blog/about/', (req, res) => {
    res.render('routes/about.pug');
})

app.get('/blog/*', (req, res) => {
    res.status(404).render('routes/error-blog.pug', {
        error_code: '404',
        title: 'This Page is Unavailable'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('routes/error-regular.pug', {
        error_code: '404',
        title: 'This Page is Unavailable'
    })
})

var listener = app.listen('8000', () => {
    console.log(`listening on port ${listener.address().port}`)
})