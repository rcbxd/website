const express = require("express");
const path = require("../util/path");
const db = require("../util/db");
const handleServerError = require("../util/serverError");
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

router.get("/login", (req, res) => {
  res.render(`${path}/views/admin/login`);
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findAll({
    where: {
      email: email,
      password: password
    }
  })
    .then(data => {
      if (data.length != 0) {
        req.session.userID = data[0].id;
        req.session.user = {
          name: data[0].name,
          email: data[0].email
        };
        res.redirect("/blog/admin/dashboard/");
      } else {
        res.render(`${path}/views/admin/login`, {
          message: "Invalid Credentials, try again"
        });
      }
    })
    .catch(err => {
      handleServerError(res, true);
    });
});

router.get("/dashboard/", (req, res) => {
  if (checkAuthentication(req, res)) {
    res.render(`${path}/views/admin/dashboard`, {
      user: req.session.user,
      path: "/blog/admin/dashboard/"
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) handleServerError(res, true);
    else res.redirect("/blog/admin/login");
  });
});

router.get("/post/add", (req, res) => {
  if (checkAuthentication(req, res)) {
    res.render(`${path}/views/admin/add`, {
      user: req.session.user
    });
  }
});

router.post("/post/add", (req, res) => {
  req.body.txt.replace(/'/g, "\\'");
  req.body.txt.replace(/"/g, '\\"');
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
        res.render(`${path}/views/admin/edit`, {
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
        res.render(`${path}/views/admin/editor`, {
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
      res.redirect("/post/edit/");
    });
  }
});

router.get("/post/delete", (req, res) => {
  if (checkAuthentication(req, res)) {
    res.render(`${path}/views/admin/delete`, {
      user: req.session.user
    });
  }
});

module.exports = router;
