const express = require('express');
const app = express();
const db = require('./config');

app.get('/films', function (req, res) {
    db.query('SELECT title FROM film ORDER BY title', function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});

app.get('/actors', function (req, res) {
    db.query('SELECT * FROM actor ORDER BY last_name limit 10', function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});

app.get('/films-by-genre/:genre', function (req, res) {
    const genre = req.params.genre;
    db.query('SELECT * FROM film AS F inner join film_category as FC on F.film_id = FC.film_id inner join category as C on FC.category_id = C.category_id WHERE C.name like ?', genre, function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});

app.get('/films-by-actor-id/:id', function (req, res) {
    const actor_id = req.params.id;
    db.query('SELECT DISTINCT title FROM film as F inner join film_actor as FA on F.film_id = FA.film_id WHERE FA.actor_id = ?', actor_id, function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});

app.get('/films-by-actor-lastname/:lastname', function (req, res) {
    const last_name = req.params.lastname;
    db.query('SELECT title FROM film as F inner join film_actor as FA on F.film_id = FA.film_id inner join actor as A on A.actor_id = FA.actor_id WHERE A.last_name = ?', last_name, function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});

app.get('/films-actor-play-by-lastname/:lastname', function (req, res) {
    const last_name = req.params.lastname;
    db.query('SELECT title FROM film as F inner join film_actor as FA on F.film_id = FA.film_id inner join actor as A on FA.actor_id = A.actor_id WHERE A.last_name like ?', [`%${last_name}%`], function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});

app.get('/genre-films', function (req, res) {
    db.query('SELECT name FROM category as C inner join film_category as FC on C.category_id = FC.category_id GROUP BY name', function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});

app.listen(3000);