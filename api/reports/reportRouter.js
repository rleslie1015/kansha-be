const router = require('express').Router();
const reportModel = require('./reportModel');
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

// Get all recognitions for the organization
router.get('/', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const reportInfo = await reportModel.recognitionInfoForMyOrg(org_id);

		return res.status(201).json(reportInfo);
	} catch (error) {
		console.log('error getting report', error);
		return res.status(500).json({ error });
	}
});

module.exports = router;
