const express = require('express');
const db = require('../util/db');
const handleServerError = require('../util/serverError');
const path = require('../util/path')
const {
    Remarkable
} = require('remarkable');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const router = express.Router();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

router.get('/:id/', (req, res) => {
    Post.findByPk(req.params.id)
        .then(post => {
            if (!post)
                handleServerError(res, true);
            let md = new Remarkable();
            post.getComments().then(comments => {
                post.dataValues.body = md.render(post.dataValues.body);
                res.render(`${path}/views/blog/article`, {
                    post: post.dataValues,
                    months: months,
                    comments: comments,
                    user: req.session.user,
                })
            })

        });
});

router.post('/:id/like', (req, res) => {
    Post.findByPk(req.params.id)
        .then((post) => {
            if (!post) {
                handleServerError(res, true);
            } else {
                let likes = post.dataValues.likes + 1;
                Post.update({
                    likes: likes
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                res.json(likes);
            }
        }).catch(err => {
            handleServerError(res, true);
        })
})

router.post('/:id/comment/', (req, res) => {
    let name = req.body.name;
    let comment = req.body.body;
    Post.findByPk(req.params.id)
        .then((post) => {
            post.createComment({
                    name: name,
                    body: comment,
                    time: new Date()
                })
                .then(
                    res.send('Done')
                ).catch(err => {
                    handleServerError(res, true);
                })
        })
})

router.post('/:id/unlike/', (req, res) => {
    Post.findByPk(req.params.id)
        .then((post) => {
            if (!post) {
                handleServerError(res, true);
            } else {
                let likes = post.dataValues.likes - 1;
                Post.update({
                    likes: likes
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                res.json(likes);
            }
        }).catch(err => {
            handleServerError(res, true);
        })
})

module.exports = router;