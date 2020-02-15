const express = require("express");
const path = require("../util/path");
const handleServerError = require("../util/serverError");
const Post = require("../models/Post");
const User = require("../models/User");

const router = express.Router();

const checkAuthentication = (req, res) => {
  if (!req.session.userID || !req.session.user) {
    res.redirect("/blog/user/login");
    return false;
  }
  return true;
};

router.get("/dashboard/", (req, res) => {
  if (checkAuthentication(req, res)) {
    res.render(`${path}/views/blog/admin/dashboard`, {
      user: req.session.user,
      path: "/blog/admin/dashboard/"
    });
  }
});

router.get("/post/add", (req, res) => {
  if (checkAuthentication(req, res)) {
    res.render(`${path}/views/blog/admin/add`, {
      user: req.session.user
    });
  }
});

router.post("/post/add", (req, res) => {
  Post.create({
    title: req.body.name,
    description: req.body.desc,
    body: req.body.txt
  })
    .then(data => {
      res.redirect("/blog/admin/post/add");
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/post/edit", (req, res) => {
  if (checkAuthentication(req, res)) {
    Post.findAll()
      .then(posts => {
        res.render(`${path}/views/blog/admin/edit`, {
          user: req.session.user,
          posts: posts.reverse()
        });
      })
      .catch(err => {
        handleServerError(res, true);
      });
  }
});

router.get("/post/edit/:id", (req, res) => {
  if (checkAuthentication(req, res)) {
    let id = req.params.id;
    Post.findByPk(id)
      .then(post => {
        res.render(`${path}/views/blog/admin/editor`, {
          post: post,
          user: req.session.user
        });
      })
      .catch(err => {
        handleServerError(res, true);
      });
  }
});

router.post("/post/edit/:id", (req, res) => {
  if (checkAuthentication(req, res)) {
    Post.findByPk(req.params.id).then(post => {
      post.update({
        title: req.body.name,
        description: req.body.desc,
        body: req.body.txt
      });
      res.redirect("/blog/admin/post/edit/");
    });
  }
});

router.get("/post/remove", (req, res) => {
  if (checkAuthentication(req, res)) {
    res.render(`${path}/views/blog/admin/delete`, {
      user: req.session.user
    });
  }
});

module.exports = router;
