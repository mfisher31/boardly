module.exports = {
	getHomePage: (_req, res) => {
        let query = `
            SELECT 
                g.id,
                g.name,
                g.created_at,
                MAX(gs.session_date) as last_played_date
            FROM games g
            LEFT JOIN game_sessions gs ON g.id = gs.game_id
            GROUP BY g.id, g.name
            ORDER BY g.created_at ASC
        `;

        db.query(query, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.render('index.ejs', {
                    title: 'Boardly',
                    games: []
                });
            }
            res.render('index.ejs', {
                title: 'Boardly',
                games: result
            });
        });
    }
};
