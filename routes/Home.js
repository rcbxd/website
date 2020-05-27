const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const handleServerError = require("../util/serverError");

router.get("/", (req, res, next) => {
  res.render("views/index");
});

router.get("/projects/", (req, res, next) => {
  res.render("views/projects");
});

router.get("/personal/", (req, res, next) => {
  res.render("views/personal");
});

router.get("/skills/", (req, res, next) => {
  res.render("views/skills");
});

module.exports = router;
