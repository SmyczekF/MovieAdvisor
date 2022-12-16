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

const options = {
    args: ["15"]
}

PythonShell.run("./cinema-city-scrape.py", options, (err, res) => {
    
    res.forEach(el => {
        const record = JSON.parse(el)
        record.forEach(field => {
            field['description'] = field['description'].replaceAll('"','\\"')

            const sqlInsert = `insert into movies_cinemacity
            values 
            (
            NULL,
            "${field['title']}", 
            "${field['original_lang']}",
            ${field['dubbing']},
            ${field['subtitles']},
            "${field['movie_type']}",
            "${field['genres']}",
            "${field['cast']}",
            "${field['director']}",
            STR_TO_DATE('${field['date']}', '%d/%m/%Y %H:%i'),
            "${field['length']}",
            "${field['age']}",
            "${field['description']}",
            "${field['city']}",
            STR_TO_DATE('${field['premiere']}', '%d %M %Y')
            )`
            
            db.query(sqlInsert, (err, response) => {
                console.log('ERROR: ' + err);
                console.log('ODP: ' + response);
            })
        })  
    })
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