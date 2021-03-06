const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const db = require("./util/db");
const testuser = require("./util/testUser");
const handleServerError = require("./util/serverError");
require("dotenv").config();

//middleware
const homePage = require("./routes/Home");
const blogHome = require("./routes/BlogHome");
const blogPost = require("./routes/BlogArticle");
const blogUser = require("./routes/BlogUser");
const blogAdmin = require("./routes/BlogAdmin");

//models
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const User = require("./models/User");
const Like = require("./models/Like");

app.set("views", path.join(__dirname, "/"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000
    }
  })
);

//URLs
app.use("/", homePage);
app.use("/blog/", blogHome);
app.use("/blog/post", blogPost);
app.use("/blog/user/", blogUser);
app.use("/blog/admin/", blogAdmin);

//404s
app.get("/blog/*", (req, res) => {
  res.status(404).render("./views/error-blog", {
    error_code: "404",
    title: "This Page is Unavailable"
  });
});

app.get("*", (req, res) => {
  res.status(404).render("./views/error-regular", {
    error_code: "404",
    title: "This Page is Unavailable"
  });
});

Post.hasMany(Comment, {
  constraints: true,
  onDelete: "CASCADE"
});
Comment.belongsTo(Post, {
  constraints: true,
  onDelete: "CASCADE"
});
User.hasMany(Like, {
  constraints: true,
  onDelete: "CASCADE"
});
Like.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});

db.sync()
  .then(res => {
    if (process.argv.indexOf("--testuser") != -1) {
      testuser();
    }
    let listener = app.listen(process.env.PORT || 7000, () => {
      console.log(`listening on port ${listener.address().port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
