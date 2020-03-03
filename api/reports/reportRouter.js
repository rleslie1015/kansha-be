const router = require('express').Router();
const reportModel = require('./reportModel');
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

router.get('/', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const reportInfo = await reportModel.dataForMyOrg(org_id, req.query);

		return res.status(201).json(reportInfo);
	} catch (error) {
		console.log('error getting report', error);
		return res.status(500).json({ error });
	}
});

module.exports = router;
