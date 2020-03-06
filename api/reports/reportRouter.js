const router = require('express').Router();
const reportModel = require('./reportModel');
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

router.get('/', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const reportInfo = await reportModel.getDataForMyOrg(org_id, req.query);

		return res.status(201).json(reportInfo);
	} catch (error) {
		console.log('error getting report', error);
		return res.status(500).json({ error });
	}
});

router.get('/top', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const reportInfo = await reportModel.getTops(org_id, req.query);

		return res.status(201).json(reportInfo);
	} catch (error) {
		console.log('error getting report', error);
		return res.status(500).json({ error });
	}
});

// Endpoint to get employee engagement

router.get('/engagement', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const empEngagement = await reportModel.getPercentThanked(
			org_id,
			req.query,
		);
		return res.status(200).json(empEngagement);
	} catch (error) {
		console.log('Error getting total engagement', error);
		return res.status(500).json({ error });
	}
});

// Endpoint to retrieve recognitions in a date range

router.get('/range', async (req, res) => {
	const { org_id } = req.profile;

	try {
		const rangeData = await reportModel.getRangeOfDataForMyOrg(
			org_id,
			req.query,
		);
		return res.status(200).json(rangeData);
	} catch (error) {
		console.log('Error getting that range of data', error);
		return res.status(500).json({ error });
	}
});

module.exports = router;
