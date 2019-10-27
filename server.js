const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const db = require('./util/db');
const throwRender500Error = require('./util/serverError');
require('dotenv').config();

//middleware
const homePage = require('./routes/Home');
const blogHome = require('./routes/BlogHome');
const blogPost = require('./routes/BlogArticle');
const blogAdmin = require('./routes/BlogAdmin');

app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'pug');
app.use('/static/', express.static('static'));
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000
    }
}))

//URLs
app.use('/', homePage);
app.use('/blog/', blogHome);
app.use('/blog/post', blogPost);
app.use('/blog/admin/', blogAdmin);

//404s
app.get('/blog/*', (req, res) => {
    res.status(404).render('./views/error-blog', {
        error_code: '404',
        title: 'This Page is Unavailable',
    })
})

app.get('*', (req, res) => {
    res.status(404).render('./views/error-regular', {
        error_code: '404',
        title: 'This Page is Unavailable',
    })
})

var listener = app.listen('7000', () => {
    console.log(`listening on port ${listener.address().port}`);
})