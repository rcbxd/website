const express = require('express');
const path = require('../util/path');
const db = require('../util/db');
const handleServerError = require('../util/serverError');

const router = express.Router();

const checkAuthentication = (req, res) => {
    if (!req.session.userID || !req.session.user) {
        res.redirect('/blog/admin/login');
        return false;
    }
    return true;
}

router.get('/login', (req, res) => {
    res.render(`${path}/views/admin/login`);
})

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    db.query("SELECT * FROM admins WHERE `email` = '" + email + "' and `password` = '" + password + "' ", (err, results, fields) => {
        if (err) {
            handleServerError(res, true);
            res.send('Error');
        } else {
            if (results.length) {
                req.session.userID = results[0].id;
                req.session.user = {
                    name: results[0].name,
                    email: results[0].email
                };
                res.redirect('/blog/admin/dashboard');
            } else
                res.render(`${path}/views/admin/login`, {
                    message: "Invalid Credentials, try again"
                })
        }
    });
})

router.get('/dashboard', (req, res) => {
    if (checkAuthentication(req, res)) {
        res.render(`${path}/views/admin/dashboard`, {
            user: req.session.user
        });
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
            handleServerError(res, true);
        else
            res.redirect('/login');
    })
})

router.get('/post/add', (req, res) => {
    if (checkAuthentication(req)) {
        res.render(`${path}/views/admin/add`, {
            user: req.session.user
        });
    }
})

router.post('/post/add', (req, res) => {
    req.body.txt.replace(/'/g, "\\'");
    req.body.txt.replace(/"/g, '\\"');
    db.query("INSERT INTO article (title, description, body) VALUES ('" + req.body.name + "', '" + req.body.desc + "', '" + req.body.txt + "');", (err, result, fields) => {
        if (err)
            handleServerError(res, true);
        else {
            res.redirect('/blog/admin/post/add');
        }
    });
})

router.get('/post/edit', (req, res) => {
    if (checkAuthentication(req, res)) {
        db.query("SELECT * FROM article;", (err, result, fields) => {
            if (err)
                handleServerError(res, true);
            else {
                res.render(`${path}/views/admin/edit`, {
                    user: req.session.user,
                    posts: result.reverse(),
                });
            }
        })
    }
});

router.get('/post/edit/:id', (req, res) => {
    if (checkAuthentication(req, res)) {
        let id = req.params.id;
        db.query("SELECT * FROM article WHERE id = " + id, (err, result, fields) => {
            if (err)
                handleServerError(res, true);
            else {
                res.render(`${path}/views/admin/editor`, {
                    post: result[0],
                    user: req.session.user
                })
            }
        })
    }
})

router.post('/post/edit/:id', (req, res) => {
    if (checkAuthentication(req, res)) {
        req.body.txt.replace(/'/g, "\\'");
        req.body.txt.replace(/"/g, '\\"');
        let text = req.body.txt;
        let description = req.body.desc;
        let title = req.body.name;
        db.query("UPDATE article SET title = '" + title + "', description = '" + description + "', body = '" + text + "' WHERE id = " + req.params.id, (err, results, fields) => {
            if (err)
                handleServerError(res, true);
            else {
                res.redirect(`/blog/admin/post/edit/${req.params.id}`);
            }
        })
    }
})

router.get('/post/delete', (req, res) => {
    if (checkAuthentication(req, res)) {
        res.render(`${path}/views/admin/delete`, {
            user: req.session.user
        });
    }
})

module.exports = router;