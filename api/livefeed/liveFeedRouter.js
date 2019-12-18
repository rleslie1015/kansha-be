const router = require('express').Router();
const { getOrgRecognitions } = require('./liveFeedModel');
const { emitterOutput } = require('./liveFeedEmitter');
const { validateId } = require('../../middleware/authMiddleWare');

router.get('/', validateId, (req, res) => {
	getOrgRecognitions(req.profile.org_name).then(data => res.json(data));
});

router.get('/live', validateId, (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		Connection: 'keep-alive',
	});

<<<<<<< HEAD
	req.socket.setTimeout(0x7FFFFFFF);

=======
>>>>>>> 496b79a021507264f9e24308af424623d77bb25d
	const sendEvent = event => {
		res.write(`event: ${event.type}\n`);
		res.write(`data: ${JSON.stringify(event.payload)}\n\n`);
	};

	emitterOutput.on(req.profile.org_name, sendEvent);

	res.on('close', () => {
		emitterOutput.removeListener(req.profile.org_name, sendEvent);
	});
});

module.exports = router;
