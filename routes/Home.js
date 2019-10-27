const express = require('express');
const router = express.Router();
const db = require('../util/db');

router.get('/', (req, res, next) => {
    db.query("SELECT * FROM article ORDER BY date DESC", (err, result, fields) => {
        if (err) {
            throwRender500Error(res, false);
        } else {
            res.render('views/index', {
                posts: result,
            });
        }
    })
})

module.exports = router;