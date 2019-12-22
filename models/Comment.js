const sq = require("sequelize");
const db = require("../util/db");

const Comment = db.define("comment", {
  id: {
    type: sq.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  time: {
    type: sq.DATE
  },
  body: {
    type: sq.TEXT,
    allowNull: false
  },
  name: {
    type: sq.STRING,
    allowNull: false
  }
});

module.exports = Comment;
