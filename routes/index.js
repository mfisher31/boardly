module.exports = {
	getHomePage: (_req, res) => {
        let query = `
            SELECT 
                g.*,
                gs.id as session_id,
                gs.session_date as last_played_date,
                gs.notes as last_session_notes
            FROM games g
            LEFT JOIN (
                SELECT game_id, MAX(session_date) as max_date
                FROM game_sessions
                GROUP BY game_id
            ) latest ON g.id = latest.game_id
            LEFT JOIN game_sessions gs ON gs.game_id = latest.game_id AND gs.session_date = latest.max_date
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
