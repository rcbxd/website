const mysql = require('mysql');
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

var con = mysql.createConnection(db_config);

con.connect(function (err) {
    if (err) console.log(`Database error: ${err}`);
    console.log("Connected!");
});

module.exports = con;