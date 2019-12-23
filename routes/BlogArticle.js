const express = require("express");
const db = require("../util/db");
const handleServerError = require("../util/serverError");
const path = require("../util/path");
const { Remarkable } = require("remarkable");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const User = require("../models/User");

const router = express.Router();

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

router.get("/:id/", (req, res) => {
  var logged_in = true;
  if (!req.session.userID || !req.session.user) {
    logged_in = false;
  }
  Post.findByPk(req.params.id)
    .then(post => {
      if (!post) handleServerError(res, true);
      let md = new Remarkable();
      post
        .getComments()
        .then(comments => {
          var is_liked = false;
          if (logged_in) {
            User.findByPk(req.session.user.id)
              .then(user => {
                user
                  .getLikes({
                    where: {
                      post: post.id
                    }
                  })
                  .then(likes => {
                    console.log(likes);
                    if (likes.length != 0) is_liked = true;
                  })
                  .catch(err => {
                    handleServerError(res, true);
                  });
              })
              .catch(err => {
                handleServerError(res, true);
              });
          }
          if (comments.length == 0) comments = [];
          post.dataValues.body = md.render(post.dataValues.body);
          res.render(`${path}/views/blog/article`, {
            post: post.dataValues,
            months: months,
            comments: comments,
            user: req.session.user,
            login_status: logged_in,
            liked: is_liked
          });
        })
        .catch(err => {
          console.log(err);
          handleServerError(res, true);
        });
    })
    .catch(err => {
      handleServerError(res, true);
    });
});

router.post("/:id/like", (req, res) => {
  if (req.session.user || req.session.userID)
    Post.findByPk(req.params.id)
      .then(post => {
        if (!post) {
          handleServerError(res, true);
        } else {
          let likes = post.dataValues.likes;
          User.findByPk(req.session.user.id)
            .then(user => {
              user
                .getLikes({
                  where: {
                    post: post.id
                  }
                })
                .then(data => {
                  if (data.length == 0) {
                    likes++;
                    user
                      .createLike({ post: post.id })
                      .then(() => {
                        post.update({
                          likes: likes
                        });
                        res.redirect("back");
                      })
                      .catch(err => {
                        console.log(err);
                        handleServerError(res, true);
                      });
                  } else {
                    likes--;
                    console.log(data[0]);
                    Like.destroy({
                      where: {
                        post: data[0].dataValues.post
                      }
                    })
                      .then(() => {
                        post.update({
                          likes: likes
                        });
                        res.redirect("back");
                      })
                      .catch(err => {
                        console.log(err);
                        handleServerError(res, true);
                      });
                  }
                });
            })
            .catch(err => {
              console.log(err);
              handleServerError(res, true);
            });
        }
      })
      .catch(err => {
        console.log(err);
        handleServerError(res, true);
      });
});

router.post("/:id/comment/", (req, res) => {
  let name = req.body.name;
  let comment = req.body.body;
  Post.findByPk(req.params.id).then(post => {
    post
      .createComment({
        name: name,
        body: comment,
        time: new Date()
      })
      .then(res.send("Done"))
      .catch(err => {
        handleServerError(res, true);
      });
  });
});

module.exports = router;
