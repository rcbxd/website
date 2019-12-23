const db = require("../util/db");
const sq = require("sequelize");

const Like = db.define("like", {
  post: {
    type: sq.INTEGER,
    primaryKey: true,
    allowNull: false
  }
});

module.exports = Like;
