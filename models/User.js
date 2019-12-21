const sq = require('sequelize');
const db = require('../util/db');

const User = db.define('user', {
    id: {
        type: sq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: sq.STRING,
    email: sq.STRING,
    password: sq.STRING,
    admin: sq.BOOLEAN,
})

module.exports = User;