const express = require('express');
const app = express();
const db = require('./config');

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/categories', function (req, res) {
    db.query('SELECT * FROM category', function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});
app.listen(3000);