const router = require('express').Router();
const { getUserInteractions } = require('./profileModel');
const auth = require('../../middleware/authMiddleWare');
const { find } = require('../user/userModel.js');

router.use(auth.validateId);

router.get('/', (req, res) => {
	getUserInteractions(req.profile.id).then(rec => {
		let { profile } = req;
		profile.rec = rec;
		res.status(200).json({ user: profile });
	});
});

router.get('/:id', validatePeerId, (req, res) => {
	getUserInteractions(req.peer.id)
		.then(rec => {
			let { peer } = req;
			peer.rec = rec;
			res.status(200).json({ peer });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ err });
		});
});

function validatePeerId(req, res, next) {
	const { id } = req.params;
	const { profile } = req;
	find({ 'Users.id': id }).then(([user]) => {
		if (!user || user.org_name !== profile.org_name) {
			res.status(200).json({ peer: false });
		} else {
			req.peer = user;
			next();
		}
	});
}

module.exports = router;
