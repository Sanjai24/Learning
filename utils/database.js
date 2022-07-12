const mysql = require('mysql2');
require('dotenv').config();

let database = mysql.createPool(
    {
        user: 'root',
        password: 'password',
        database: 'authenticate',
        host: 'logindb.c9ouq2uucnm1.us-east-1.rds.amazonaws.com',
        port: 3306,
        multipleStatements: true,

    }
);

module.exports = database;