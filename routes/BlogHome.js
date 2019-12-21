const express = require('express');
const db = require('../util/db');
const handleServerError = require('../util/serverError');
const path = require('../util/path');
const Post = require('../models/Post');

const router = express.Router();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

router.get('/', (req, res) => {
    Post.findAll()
        .then(posts => {
            res.render(`${path}/views/blog/blog`, {
                months: months,
                posts: posts.reverse(),
                user: req.session.user,
                path: `/blog/`
            })
        })
        .catch(err => {
            handleServerError(res, true);
        })
})

router.get('/favorites/', (req, res) => {
    res.render(`${path}/views/blog/favorites`, {
        user: req.session.user,
        path: `/blog/favorites/`
    });
})

router.get('/about/', (req, res) => {
    res.render(`${path}/views/blog/about`, {
        user: req.session.user,
        path: `/blog/about/`
    });
})

module.exports = router;