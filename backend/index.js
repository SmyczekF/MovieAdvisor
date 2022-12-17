const express = require('express');
const app = express();
const mysql = require('mysql');
// const cors = require('cors');

const {PythonShell} = require('python-shell');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movieadvisor'
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
})

app.get('/api/cinema-city/add-movies', (req, res) => {
    PythonShell.run("./cinema-city-scrape.py", null, (err, res) => console.log(res))
})

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movies_cinemacity";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.get('/', (req, res) => {
    res.send('Hello Filip!')
})

app.listen(3001, () => {
    console.log('running on port 3001');
})