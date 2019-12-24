const express = require("express");
const handleServerError = require("../util/serverError");
const path = require("../util/path");
const Post = require("../models/Post");
const User = require("../models/User");

const router = express.Router();

const checkAuthentication = (req, res) => {
  if (!req.session.userID || !req.session.user) {
    res.redirect("/blog/admin/login");
    return false;
  }
  return true;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

router.get("/", (req, res) => {
  Post.findAll()
    .then(posts => {
      res.render(`${path}/views/blog/blog`, {
        months: months,
        posts: posts.reverse(),
        user: req.session.user,
        path: `/blog/`
      });
    })
    .catch(err => {
      handleServerError(res, true);
    });
});

router.get("/favorites/", (req, res) => {
  if (checkAuthentication(req, res)) {
    User.findByPk(req.session.user.id)
      .then(user => {
        user
          .getLikes()
          .then(likes => {
            var liked_posts = [];
            if (likes.length == 0) {
              res.render(`${path}/views/blog/favorites`, {
                user: req.session.user,
                posts: liked_posts,
                path: `/blog/favorites/`
              });
            }
            for (let i = 0; i < likes.length; i++) {
              Post.findByPk(likes[i].post)
                .then(post => {
                  liked_posts.push({ id: post.id, title: post.title });
                  if (i == likes.length - 1) {
                    res.render(`${path}/views/blog/favorites`, {
                      user: req.session.user,
                      posts: liked_posts,
                      path: `/blog/favorites/`
                    });
                  }
                })
                .catch(err => {
                  console.log(1);
                  handleServerError(res, true);
                });
            }
          })
          .catch(err => {
            handleServerError(res, true);
          });
      })
      .catch(err => {
        handleServerError(res, true);
      });
  }
});

router.get("/about/", (req, res) => {
  res.render(`${path}/views/blog/about`, {
    user: req.session.user,
    path: `/blog/about/`
  });
});

module.exports = router;
