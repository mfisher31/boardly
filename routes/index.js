module.exports = {
	getHomePage: (_req, res) => {
		let query = "SELECT * FROM games ORDER BY name";

		db.query(query, (err, result) => {
			if (err) {
				res.redirect('/');
			}
			res.render('index.ejs', {
				title: 'Board Games | View Games',
				games: result
			});
		});
	}
};
