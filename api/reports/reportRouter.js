const router = require('express').Router();
const reportModel = require('./reportModel');
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

// Get all recognitions for the organization
router.get('/day', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const reportInfo = await reportModel.oneDayDataForMyOrg(org_id);

		return res.status(201).json(reportInfo);
	} catch (error) {
		console.log('error getting report', error);
		return res.status(500).json({ error });
	}
});

router.get('/week', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const reportInfo = await reportModel.oneWeekDataForMyOrg(org_id);

		return res.status(201).json(reportInfo);
	} catch (error) {
		console.log('error getting report', error);
		return res.status(500).json({ error });
	}
});

router.get('/month', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const reportInfo = await reportModel.oneMonthDataForMyOrg(org_id);

		return res.status(201).json(reportInfo);
	} catch (error) {
		console.log('error getting report', error);
		return res.status(500).json({ error });
	}
});

router.get('/year', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const reportInfo = await reportModel.oneYearDataForMyOrg(org_id);

		return res.status(201).json(reportInfo);
	} catch (error) {
		console.log('error getting report', error);
		return res.status(500).json({ error });
	}
});

module.exports = router;
