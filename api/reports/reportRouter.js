const router = require('express').Router();
const Reports = require('./reportModel');
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

router.get('/', async (req, res) => {
	const { org_id } = req.profile;
	try {
		const reportInfo = await Reports.getDataForMyOrg(org_id, req.query);
		return res.status(200).json(reportInfo);
	} catch (error) {
		console.error('error getting report', error);
		return res.status(500).json({ error });
	}
});

router.get('/top', async (req, res) => {
	const { org_id } = req.profile;
	try {
		const reportInfo = await Reports.getTops(org_id, req.query);

		return res.status(200).json(reportInfo);
	} catch (error) {
		console.error('error getting report', error);
		return res.status(500).json({ error });
	}
});

// Endpoint to get employee engagement

router.get('/engagement', async (req, res) => {
	const { org_id } = req.profile;
	try {
		const empEngagement = await Reports.getPercentThanked(
			org_id,
			req.query,
		);
		return res.status(200).json(empEngagement);
	} catch (error) {
		console.error('Error getting total engagement', error);
		return res.status(500).json({ error });
	}
});

// Endpoint to retrieve recognitions in a date range

router.get('/range', async (req, res) => {
	const { org_id } = req.profile;
	try {
		const rangeData = await Reports.getRangeOfDataForMyOrg(
			org_id,
			req.query,
		);
		return res.status(200).json(rangeData);
	} catch (error) {
		console.error('Error getting that range of data', error);
		return res.status(500).json({ error });
	}
});

module.exports = router;
