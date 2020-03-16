const router = require('express').Router();

const upload = require('./profilePicUpload');
const userModel = require('../user/userModel.js');

const singleUpload = upload.single('image');

router.post('/', function(req, res) {
	singleUpload(req, res, function(err) {
		userModel
			.editUserBySub(req.user.sub, { profile_picture: req.file.location })
			.catch(err => console.err(err));
		console.log(req.file.location);
		return res.json({ url: req.file.location });
	});
});

module.exports = router;
