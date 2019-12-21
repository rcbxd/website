const db = require('../util/db');
const sq = require('sequelize');

const Post = db.define('post', {
    id: {
        type: sq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sq.STRING,
        defaultValue: "",
    },
    body: {
        type: sq.TEXT,
    },
    date: {
        type: sq.DATE,
        defaultValue: sq.NOW
    },
    likes: {
        type: sq.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: sq.STRING,
        defaultValue: ""
    },
})

module.exports = Post;