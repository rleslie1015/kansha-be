const router = require('express').Router();
const Recognitions = require('./recModel');
const { emitterInput } = require('../livefeed/liveFeedEmitter');
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

router.get('/', async (req, res) => {
	try {
		const recognitions = await Recognitions.findAll();
		res.status(200).json(recognitions);
	} catch (err) {
		console.error(err);
		res.status(500).json(err.message);
	}
});

// Get recognitions by organization ID
router.get('/admin', async (req, res) => {
	const { org_id } = req.profile;
	try {
		const recognitions = await Recognitions.getRecByOrg(org_id, req.query);
		res.status(200).json(recognitions);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Recognition List could not be retrieved from the database',
		});
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const recognition = await Recognitions.findById(id);
		if (recognition) {
			res.status(200).json(recognition);
		} else {
			res.status(404).json({ message: 'recognition not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	const { recipient, sender, message, date, badge_id } = req.body;
	const { org_id } = req.profile;
	try {
		const [rec] = await Recognitions.addRec({
			recipient,
			sender,
			message,
			date,
			badge_id,
			org_id,
		});
		emitterInput.emit('event', {
			payload: rec,
			type: 'FEED_EVENT_NEW_REC',
			org_name: req.profile.org_name,
		});
		res.status(201).json(rec);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await Recognitions.deleteRec(id);
		emitterInput.emit('event', {
			payload: { id },
			type: 'FEED_EVENT_REMOVE_REC',
			org_name: req.profile.org_name,
		});
		res.sendStatus(204);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	try {
		await Recognitions.editRec(id, body);
		res.status(200).json(body);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
