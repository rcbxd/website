const express = require('express');
const db = require('../util/db');
const handleServerError = require('../util/serverError');
const path = require('../util/path')
const {
    Remarkable
} = require('remarkable');

const router = express.Router();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

router.get('/:id/', (req, res) => {
    console.log(`user viewing ${req.params.id}`);
    db.query("SELECT * FROM article WHERE id = " + req.params.id, (err, result, fields) => {
        if (err) {
            handleServerError(res, true);
        } else {
            let post = result[0];
            db.query("SELECT * FROM comments WHERE post = " + req.params.id + " ORDER BY id DESC", (err, result, fields) => {
                if (err) {
                    handleServerError(res, true);
                } else {
                    let md = new Remarkable();
                    post.body = md.render(post.body);
                    res.render(`${path}/views/blog/article`, {
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

router.post('/:id/like', (req, res) => {
    let likes = 0;
    db.query('SELECT likes FROM article WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err)
            throw err;
        likes = results[0].likes + 1;
        db.query('UPDATE article SET likes = ' + likes + ' WHERE id = ' + req.params.id, (err, results, fields) => {
            if (err)
                throw err;
        })
    })
    res.json(likes);
})

router.post('/:id/comment/', (req, res) => {
    let name = req.body.name;
    let comment = req.body.body;
    db.query("INSERT INTO comments (name, body, post) VALUES ('" + name + "', '" + comment + "', " + req.params.id + ")", (err, results, fields) => {
        if (err)
            handleServerError(res, true);
    })
    res.send('Done');
})

router.post('/:id/unlike/', (req, res) => {
    let likes = 0;
    db.query('SELECT likes FROM article WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err)
            res.send('Error');
        likes = results[0].likes - 1;
        db.query('UPDATE article SET likes = ' + likes + ' WHERE id = ' + req.params.id, (err, results, fields) => {
            if (err)
                throw err;
        })
    })
    res.json(likes);
})

module.exports = router;