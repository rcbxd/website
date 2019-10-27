const session = require('express-session');

session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000
    }
});

module.exports = session;