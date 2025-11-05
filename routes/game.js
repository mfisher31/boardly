module.exports = {
    getAdd: (_req, res) => {
        res.render('add-game.ejs', {
            title: 'Boardly | Add Game'
        });
    },
    getEdit: (req, res) => {
        let id = req.params.id;		
        let query = 'SELECT * FROM games WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-game.ejs', {
                title: 'Boardly | Edit Game',
                game: result[0]
            });
        });
    },
    postAdd: (req, res) => {
        let name = req.body.name;

        if (!name || name.trim() === '') {
            return res.status(400).send('Name is required');
        }

        let query = 'INSERT INTO games (name) VALUES (?)';
        db.query(query, [name.trim()], (err, _result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    postEdit: (req, res) => {
        let id = req.params.id;
        let name = req.body.name;

        // Validate that name is not empty
        if (!name || name.trim() === '') {
            return res.status(400).send('Name is required');
        }

        let query = 'UPDATE games SET name = ? WHERE id = ?';
        db.query(query, [name.trim(), id], (err, _result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};
