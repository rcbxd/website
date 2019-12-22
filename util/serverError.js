const path = require("../util/path");

function throwRender500Error(res, blog = false) {
  res.status(500);
  if (!blog) {
    res.render(`${path}/views/error-regular.pug`, {
      title: "This is A Server Error",
      error_code: "500"
    });
  } else {
    res.render(`${path}/views/error-blog.pug`, {
      title: "This is A Server Error",
      error_code: "500"
    });
  }
}

module.exports = throwRender500Error;
