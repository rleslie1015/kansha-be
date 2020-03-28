const router = require('express').Router();
const Badges = require('./recModel');

router.get('/', async (req, res) => {
	try {
		const badges = await Badges.getBadges();
		res.status(200).json(badges);
	} catch (err) {
		console.error(err);
		res.status(500).json(err.message);
	}
});

module.exports = router;
