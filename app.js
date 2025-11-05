// app.js
// Main entry point for application

require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser= require('body-parser');
const app = express();
const { getHomePage } = require('./routes/index');
const game = require('./routes/game');
const game_session = require('./routes/game-session');

// Read port from the environment or default to 3000
const port = process.env.PORT || 3000;

// Read db connection details from the environment or use defaults
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'app',
    password: process.env.DB_PASSWORD || 'wonderful',
    database: process.env.DB_NAME || 'miechallenge'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view cache', false);
app.use(bodyParser.urlencoded({ extended: false }));

// If there are static files, make a public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Routes
app.get('/', getHomePage);
app.get('/sessions/:game_id?', game_session.getSessions);
app.get('/add-game', game.getAdd);
app.post('/add-game', game.postAdd);
app.get('/edit-game/:id', game.getEdit);
app.post('/edit-game/:id', game.postEdit);
app.get('/add-game-session/:id?', game_session.getAdd);
app.post('/add-game-session', game_session.postAdd);
app.get('/edit-game-session/:id', game_session.getEdit);
app.post('/edit-game-session/:id', game_session.postEdit);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
