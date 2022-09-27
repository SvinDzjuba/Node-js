const dbConfig = require('./database.js');
const mysql = require('mysql2');

// // Create a connection to the database
// const connection = mysql.createConnection({
//     // connectionLimit : 10,
//     host: dbConfig.host,
//     user: dbConfig.user,
//     password: dbConfig.password,
//     database: dbConfig.database,
//     // debug: false
// });

// // Open the MySQL connection
// connection.connect(error => {
//     if(error) {
//         console.log(error.message);
//     }
// });

const connection = mysql.createPool(dbConfig)

module.exports = connection;