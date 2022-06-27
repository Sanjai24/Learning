const mysql = require('mysql2');
require('dotenv').config();

let database = mysql.createPool(
    {
        user: 'root',
        password: '',
        database: 'authenticate',
        host: 'localhost',
        port: 3306,
        multipleStatements: true,

    }
);

module.exports = database;