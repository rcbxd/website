const express = require('express');
const db = require('../util/db');
const handleServerError = require('../util/serverError');
const path = require('../util/path');

const router = express.Router();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

router.get('/', (req, res) => {
    db.query("SELECT * FROM article ORDER BY date DESC", (err, result, fields) => {
        if (err) {
            handleServerError(res, true);
        } else {
            res.render(`${path}/views/blog/blog`, {
                months: months,
                posts: result,
                user: req.session.user,
            })
        }
    })
})

router.get('/favorites/', (req, res) => {
    res.render(`${path}/views/blog/favorites`, {
        user: req.session.user
    });
})

router.get('/about/', (req, res) => {
    res.render(`${path}/views/blog/about`);
})

module.exports = router;