const express = require('express');
const app = express();
app.use(express.json());
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
    db.query('SELECT name, COUNT(F.film_id) as counter FROM category as C inner join film_category as FC on C.category_id = FC.category_id inner join film as F on FC.film_id = F.film_id GROUP BY name', function (error, results) {
        if (error) throw error;
        return res.send({data: results});
    });
});

// =======================

// ACTOR
// POST
app.post('/add-actor', (req, res) => {
    db.query(`INSERT INTO actor SET ?`, req.body, (error, results) => {
        // {
        //     "first_name": "",
        //     "last_name": "",
        // }
        if (error) throw error;
        res.status(201).send(`Actor added with ID: ${results.insertId}`);
    });
});
// UPDATE
app.put('/update-actor/:id', (req, res) => {
    db.query(`UPDATE actor SET ? WHERE actor_id = ?`, [req.body, req.params.id], (error, results) => {
        if (error) throw error;
        res.status(200).send(`Actor updated with ID: ${req.params.id}`);
    });
});
// DELETE
app.delete('/delete-actor/:id', (req, res) => {
    db.query(`DELETE FROM actor WHERE actor_id = ?`, req.params.id, (error, results) => {
        if (error) throw error;
        res.status(200).send(`Actor deleted with ID: ${req.params.id}`);
    });
});


// -----------
// FILM
// POST
app.post('/add-film', (req, res) => {
    db.query(`INSERT INTO film SET ?`, req.body, (error, results) => {
        // {
        //     "title": "",
        //     "description": "",
        //     "release_year": ,
        //     "language_id": ,
        //     "rental_duration": ,
        //     "rental_rate": ,
        //     "length": ,
        //     "replacement_cost": ,
        //     "rating": "",
        //     "special_features": ""
        // }
        if (error) throw error;
        res.status(201).send(`Film added with ID: ${results.insertId}`);
    });
});
// UPDATE
app.put('/update-film/:id', (req, res) => {
    db.query(`UPDATE film SET ? WHERE film_id = ?`, [req.body, req.params.id], (error, results) => {
        if (error) throw error;
        res.status(200).send(`Film updated with ID: ${req.params.id}`);
    });
});
// DELETE
app.delete('/delete-film/:id', (req, res) => {
    db.query(`DELETE FROM film WHERE film_id = ?`, req.params.id, (error, results) => {
        if (error) throw error;
        res.status(200).send(`Film deleted with ID: ${req.params.id}`);
    });
});


// -----------
// CATEGORY
// POST
app.post('/add-category', (req, res) => {
    db.query(`INSERT INTO category SET ?`, req.body, (error, results) => {
        // {
        //     "name": "",
        // }
        if (error) throw error;
        res.status(201).send(`Category added with ID: ${results.insertId}`);
    });
});
// UPDATE
app.put('/update-category/:id', (req, res) => {
    db.query(`UPDATE category SET ? WHERE category_id = ?`, [req.body, req.params.id], (error, results) => {
        if (error) throw error;
        res.status(200).send(`Category updated with ID: ${req.params.id}`);
    });
});
// DELETE
app.delete('/delete-category/:id', (req, res) => {
    db.query(`DELETE FROM category WHERE category_id = ?`, req.params.id, (error, results) => {
        if (error) throw error;
        res.status(200).send(`Category deleted with ID: ${req.params.id}`);
    });
});

app.listen(3000);