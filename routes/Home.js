const express = require('express');
const router = express.Router();
const db = require('../util/db');
const User = require('../models/User');
const Post = require('../models/Post');
const handleServerError = require('../util/serverError');

router.get('/', (req, res, next) => {
    Post.findAll()
        .then(posts => {
            res.render('views/index', {
                posts: posts,
            });
        })
        .catch(err => {
            handleServerError(res, true);
        })
})

module.exports = router;