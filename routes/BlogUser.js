const express = require("express");
const path = require("../util/path");
const handleServerError = require("../util/serverError");
const User = require("../models/User");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render(`${path}/views/blog/user/login`, { path: `/blog/user/login/` });
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
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          admin: data[0].admin
        };
        if (data[0].admin) res.redirect("/blog/admin/dashboard/");
        else res.redirect("/blog/");
      } else {
        res.render(`${path}/views/blog/user/login`, {
          message: "Invalid Credentials, try again"
        });
      }
    })
    .catch(err => {
      handleServerError(res, true);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) handleServerError(res, true);
    else res.redirect("/blog/user/login");
  });
});

module.exports = router;
