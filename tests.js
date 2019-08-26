var express = require('express');
var app = express();
var mysql = require('mysql');
require('dotenv').config();

var environment = {
    db_host: '192.168.64.2',
    db_user: 'rcbxd',
    db_password: 'tester',
    db: 'blog_base',
}

if (process.env.TYPE == "deploy") {
    console.log('Running the deploy version.')
    var environment = {
        db_host: 'localhost',
        db_user: 'rcbxd',
        db_password: 'gfwvm7da4d99',
        db: 'blog_base'
    }
}

app.use(express.json());
app.use(express.urlencoded());
var con = mysql.createConnection({
    host: environment.db_host,
    user: environment.db_user,
    password: environment.db_password,
    database: environment.db
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    process.exit()
});