const router = require('express').Router();
const dbModel = require('./recModel');

router.get('/', (req, res) => {
	dbModel
		.getBadges()
		.then(badges => {
			res.status(200).json(badges);
		})
		.catch(err => {
			res.status(500).json(err.message);
		});
});

module.exports = router;