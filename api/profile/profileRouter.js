const router = require('express').Router();
const { findProfile, getUserInteractions } = require('./profileModel')
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

router.get('/', (req, res) => {
    getUserInteractions(req.profile.id).then(rec => {
        let { profile } = req
        profile.rec = rec
        res.status(200).json({ user: profile });
    })
});

router.get('/:id', validatePeerId, (req, res) => {
    getUserInteractions(req.peer.id).then(rec => {
        let { peer } = req
        peer.rec = rec
        res.status(200).json({ peer });
    })
})

function validatePeerId (req, res, next) {
    const { id } = req.params;
    const { profile } = req;
    console.log(profile)
	findProfile({id}).then(([user]) => {
        console.log('user:', profile)
        console.log('peer:', user)
		if (!user || user.org_name !== profile.org_name) {
			console.log('user');
			res.status(200).json({ peer: false });
		} else {
			req.peer = user;
			next();
		}
  })
}

module.exports = router;
