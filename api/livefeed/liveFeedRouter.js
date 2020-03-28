const router = require('express').Router();
const { getOrgRecognitions } = require('./liveFeedModel');
const { emitterOutput } = require('./liveFeedEmitter');
const { validateId } = require('../../middleware/authMiddleWare');

router.use(validateId);

router.get('/', async (req, res) => {
	const { org_id } = req.profile;
	try {
		const data = await getOrgRecognitions(org_id);
		res.status(200).json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.toString() });
	}
});

router.get('/live', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		Connection: 'keep-alive',
	});

	const sendEvent = event => {
		res.write(`event: ${event.type}\n`);
		res.write(`data: ${JSON.stringify(event.payload)}\n\n`);
	};

	const i = setInterval(
		() =>
			sendEvent({
				type: 'HEARTBEAT',
				payload: { message: 'stay-alive' },
			}),
		5000,
	);

	emitterOutput.on(req.profile.org_name, sendEvent);

	res.on('close', () => {
		emitterOutput.removeListener(req.profile.org_name, sendEvent);
		clearInterval(i);
	});
});

module.exports = router;
