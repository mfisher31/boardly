module.exports = {
    getSessions: (req, res) => {
        // Fetch all game sessions with game names
        let query = `
            SELECT 
                gs.id,
                gs.game_id,
                gs.session_date,
                gs.players_count,
                gs.notes,
                g.name as game_name
            FROM game_sessions gs
            JOIN games g ON gs.game_id = g.id
        `;
        let params = [];
        
        if (req.params.game_id) {
            query += ' WHERE gs.game_id = ?';
            params.push(parseInt(req.params.game_id));
        }
        
        query += ' ORDER BY gs.session_date DESC';
        
        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.render('sessions.ejs', {
                    title: 'Boardly | Sessions',
                    sessions: [],
                    game_id: req.params.game_id || null
                });
            }
            res.render('sessions.ejs', {
                title: 'Boardly | Sessions',
                sessions: result,
                game_id: req.params.game_id || null
            });
        });
    },
    getAdd: (req, res) => {
        // Fetch all games to populate the dropdown
        let query = 'SELECT id, name FROM games ORDER BY name ASC';
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('add-game-session.ejs', {
                title: 'Boardly | Add Session',
                games: result,
                game_id: req.params.id ? parseInt(req.params.id) : null
            });
        });
    },
    postAdd: (req, res) => {
        let game_id = req.body.game_id;
        let session_date = req.body.session_date;
        let players_count = req.body.players_count;
        let notes = req.body.notes;

        // Validate required fields
        if (!game_id || !session_date || !players_count) {
            return res.status(400).send('Game, session date, and number of players are required');
        }

        // Validate players_count is a positive number
        if (isNaN(players_count) || parseInt(players_count) < 1) {
            return res.status(400).send('Number of players must be at least 1');
        }

        let query = 'INSERT INTO game_sessions (game_id, session_date, players_count, notes) VALUES (?, ?, ?, ?)';
        db.query(query, [game_id, session_date, parseInt(players_count), notes || null], (err, _result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/sessions/' + game_id);
        });
    },
    getEdit: (req, res) => {
        let session_id = req.params.id;
        let session_query = 'SELECT * FROM game_sessions WHERE id = ?';
        let games_query = 'SELECT id, name FROM games ORDER BY name ASC';
        
        db.query(session_query, [session_id], (err, session_result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (session_result.length === 0) {
                return res.status(404).send('Session not found');
            }
            
            db.query(games_query, (err, games_result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('edit-game-session.ejs', {
                    title: 'Boardly | Edit Session',
                    session: session_result[0],
                    games: games_result
                });
            });
        });
    },
    postEdit: (req, res) => {
        let session_id = req.params.id;
        let game_id = req.body.game_id;
        let session_date = req.body.session_date;
        let players_count = req.body.players_count;
        let notes = req.body.notes;

        // Validate required fields
        if (!game_id || !session_date || !players_count) {
            return res.status(400).send('Game, session date, and number of players are required');
        }

        // Validate players_count is a positive number
        if (isNaN(players_count) || parseInt(players_count) < 1) {
            return res.status(400).send('Number of players must be at least 1');
        }

        let query = 'UPDATE game_sessions SET game_id = ?, session_date = ?, players_count = ?, notes = ? WHERE id = ?';
        db.query(query, [game_id, session_date, parseInt(players_count), notes || null, session_id], (err, _result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/sessions/' + game_id);
        });
    },
    postDelete: (req, res) => {
        let session_id = req.params.id;
        let game_id = req.body.game_id;
        
        let query = 'DELETE FROM game_sessions WHERE id = ?';
        db.query(query, [session_id], (err, _result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/sessions/' + game_id);
        });
    }
};
