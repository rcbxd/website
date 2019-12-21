const Sequelize = require('sequelize');
require('dotenv').config();

var db_config = {
    host: 'localhost',
    user: 'rcbxd',
    password: 'tester',
    database: 'blog_base',
}

if (process.env.DEPLOY == "true") {
    console.log('Running the deploy version.');
    var db_config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
    }
}

const db = new Sequelize(
    db_config.database,
    db_config.user,
    db_config.password, {
        dialect: 'mysql',
        host: db_config.host
    }
);

module.exports = db;