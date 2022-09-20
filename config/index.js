const dbConfig = require('../config/database.js');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.host,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

// Open the MySQL connection
connection.connect(error => {
    if(error) throw error;
    console.log('Successfully connected to the database');
});
module.exports = connection;