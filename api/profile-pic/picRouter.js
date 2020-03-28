const router = require('express').Router();

const upload = require('./profilePicUpload');
const userModel = require('../user/userModel.js');
const singleUpload = upload.single('image');

router.post('/', (req, res) => {
	singleUpload(req, res, err => {
		userModel
			.editUserBySub(req.user.sub, { profile_picture: req.file.location })
			.catch(err => console.error(err));
		return res.json({ url: req.file.location });
	});
});

module.exports = router;
