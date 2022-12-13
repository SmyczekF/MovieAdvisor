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

PythonShell.run("./cinema-city-scrape.py", null, (err, res) => {
    
    console.log('ok')
    // const sqlInsert = `insert into movies_cinemacity 
    // (TITLE, MOVIE_LANGUAGE, DUBBING,
    // SUBTITLES, GENRE, MOVIE_CAST, MOVIE_DIRECTOR, MOVIE_DATE, 
    // MOVIE_LENGTH, VIEWER_AGE, PRODUCTION_COUNTRY,
    // PRODUCTION_YEAR, MOVIE_DESCRIPTION) 
    // values 
    // (
    // 'tytul', 
    // 'pl',
    // false,
    // false,
    // 'komedia',
    // 'brad pitt',
    // 'robert',
    // '2022-10-10 01:15:00',
    // 120,
    // 12,
    // 'USA',
    // '2022',
    // 'description'
    // )`
    
    // db.query(sqlInsert, (err, response) => {
    //     console.log('ERROR: ' + err);
    //     console.log('ODP: ' + response);
    // })
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movies_cinemacity";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

// app.get('/api/insert', (req, res) => {
    
    
// })

app.get('/', (req, res) => {
    res.send('Hello Filip!')
})

app.listen(3001, () => {
    console.log('running on port 3001');
})