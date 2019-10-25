var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
var session = require('express-session');

require('dotenv').config();
const {
    Remarkable
} = require('remarkable');

var db_config = {
    host: 'localhost',
    user: 'rcbxd',
    password: 'tester',
    database: 'blog_base',
}

if (process.env.DEPLOY == "true") {
    console.log('Running the deploy version.');
    var db_config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
    }
}

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000
    }
}))
var con = mysql.createConnection(db_config);

function throwRender500Error(res, blog = false) {
    res.status(500);
    if (!blog) {
        res.render('routes/error-regular.pug', {
            title: 'This is A Server Error',
            error_code: '500',
        })
    } else {
        res.render('routes/error-blog.pug', {
            title: 'This is A Server Error',
            error_code: '500',
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
    console.log(`user viewing ${req.params.id}`);
    con.query("SELECT * FROM article WHERE id = " + req.params.id, (err, result, fields) => {
        if (err) {
            throwRender500Error(res, true);
        } else {
            var post = result[0];
            con.query("SELECT * FROM comments WHERE post = " + req.params.id + " ORDER BY id DESC", (err, result, fields) => {
                if (err) {
                    throwRender500Error(res, true);
                } else {
                    var md = new Remarkable();
                    post.body = md.render(post.body);
                    res.render('routes/article', {
                        post: post,
                        months: months,
                        comments: result,
                        user: req.session.user,
                    })
                }
            })
        }
    })

});

app.get('/blog/', (req, res) => {
    con.query("SELECT * FROM article ORDER BY date DESC", (err, result, fields) => {
        if (err) {
            throwRender500Error(res, true);
        } else {
            res.render('routes/blog', {
                months: months,
                posts: result,
                user: req.session.user,
            })
        }
    })
})

app.get('/', (req, res) => {
    con.query("SELECT * FROM article ORDER BY date DESC", (err, result, fields) => {
        if (err) {
            throwRender500Error(res, true);
        } else {
            res.render('routes/index', {
                posts: result,
            });
        }
    })
})

app.get('/blog/favorites/', (req, res) => {
    res.render('routes/favorites.pug', {
        user: req.session.user
    });
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
    res.json(likes);
})

app.post('/blog/post/:id/comment/', (req, res) => {
    var name = req.body.name;
    var comment = req.body.body;
    con.query("INSERT INTO comments (name, body, post) VALUES ('" + name + "', '" + comment + "', " + req.params.id + ")", (err, results, fields) => {
        if (err)
            throwRender500Error(res, true);
    })
    res.send('Done');
})

app.post('/blog/post/:id/unlike/', (req, res) => {
    var likes = 0;
    con.query('SELECT likes FROM article WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err)
            res.send('Error');
        likes = results[0].likes - 1;
        con.query('UPDATE article SET likes = ' + likes + ' WHERE id = ' + req.params.id, (err, results, fields) => {
            if (err)
                throw err;
        })
    })
    res.json(likes);
})

app.get('/blog/about/', (req, res) => {
    res.render('routes/about.pug');
})

app.get('/blog/login', (req, res) => {
    res.render('routes/login.pug');
})

app.post('/blog/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    con.query("SELECT * FROM admins WHERE `email` = '" + email + "' and `password` = '" + password + "' ", (err, results, fields) => {
        if (err) {
            throwRender500Error(res, true);
            res.send('Error');
        } else {
            if (results.length) {
                req.session.userID = results[0].id;
                req.session.user = {
                    name: results[0].name,
                    email: results[0].email
                };
                res.redirect('/blog/dashboard');
            } else
                res.render('routes/login.pug', {
                    message: "Invalid Credentials, try again"
                })
        }
    });
})

app.get('/blog/dashboard', (req, res) => {
    if (!req.session.userID || !req.session.user)
        res.redirect('/blog/login');
    else {
        res.render('routes/dashboard.pug', {
            user: req.session.user
        });
    }
})

app.get('/blog/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
            throwRender500Error(res, true);
        else
            res.redirect('/blog/login');
    })
})

app.get('/blog/add', (req, res) => {
    if (!req.session.userID || !req.session.user)
        res.redirect('/blog/login');
    else {
        res.render('routes/add.pug', {
            user: req.session.user
        });
    }
})

app.post('/blog/add', (req, res) => {
    req.body.txt.replace(/'/g, "\\'");
    req.body.txt.replace(/"/g, '\\"');
    con.query("INSERT INTO article (title, description, body) VALUES ('" + req.body.name + "', '" + req.body.desc + "', '" + req.body.txt + "');", (err, result, fields) => {
        if (err)
            throwRender500Error(res, true);
        else {
            res.redirect('/blog/add');
        }
    });
})

app.get('/blog/edit', (req, res) => {
    if (!req.session.userID || !req.session.user)
        res.redirect('/blog/login');
    else {
        con.query("SELECT * FROM article;", (err, result, fields) => {
            if (err)
                throwRender500Error(res, true);
            else {
                res.render('routes/edit.pug', {
                    user: req.session.user,
                    posts: result.reverse(),
                });
            }
        })
    }
})

app.get('/blog/edit/:id', (req, res) => {
    if (!req.session.userID || !req.session.user)
        res.redirect('/blog/login');
    else {
        let id = req.params.id;
        con.query("SELECT * FROM article WHERE id = " + id, (err, result, fields) => {
            if (err)
                throwRender500Error(res, true);
            else {
                res.render('routes/editor.pug', {
                    post: result[0],
                    user: req.session.user
                })
            }
        })
    }
})

app.post('/blog/edit/:id', (req, res) => {
    req.body.txt.replace(/'/g, "\\'");
    req.body.txt.replace(/"/g, '\\"');
    if (!req.sessionID || !req.session.user)
        res.redirect('/blog/login');
    else {
        let text = req.body.txt;
        let description = req.body.desc;
        let title = req.body.name;
        con.query("UPDATE article SET title = '" + title + "', description = '" + description + "', body = '" + text + "' WHERE id = " + req.params.id, (err, results, fields) => {
            if (err)
                throwRender500Error(res, true);
            else {
                res.redirect('/blog/edit/');
            }
        })
    }
})

app.get('/blog/delete', (req, res) => {
    if (!req.session.userID || !req.session.user)
        res.redirect('/blog/login');
    else {
        res.render('routes/delete.pug', {
            user: req.session.user
        });
    }
})

app.get('/blog/*', (req, res) => {
    res.status(404).render('routes/error-blog.pug', {
        error_code: '404',
        title: 'This Page is Unavailable',
    })
})

app.get('*', (req, res) => {
    res.status(404).render('routes/error-regular.pug', {
        error_code: '404',
        title: 'This Page is Unavailable',
    })
})

var listener = app.listen('7000', () => {
    console.log(`listening on port ${listener.address().port}`);
})