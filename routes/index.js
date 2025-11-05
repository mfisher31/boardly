module.exports = {
	getHomePage: (_req, res) => {
		let query = "SELECT * FROM games ORDER BY created_at ASC";

		db.query(query, (err, result) => {
			if (err) {
				res.redirect('/');
			}
			res.render('index.ejs', {
				title: 'Boardly',
				games: result
			});
		});
	}
};
