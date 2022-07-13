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

database.getConnection(function(err){
    if(err){
        console.log('Database connection failed' + err);
    }
    else{
        console.log('Database connected');
    }
})

module.exports = database;