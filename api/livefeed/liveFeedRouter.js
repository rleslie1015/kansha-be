const router = require('express').Router()
const { getOrgRecognitions } = require('./liveFeedModel')
const { feedEmitter } = require('./liveFeedEmitter')
const { validateId } = require('../../middleware/authMiddleWare')

router.get('/', validateId, (req, res) => {
    getOrgRecognitions(req.profile.org_name).then(data => res.json(data))
})

router.get('/live', validateId, (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
	});


	feedEmitter.on(`recognition-${req.profile.org_name}`, data => {
		res.write(`event: recognition\n`);
		res.write(`data: ${JSON.stringify(data)}\n\n`);
	});
});

module.exports = router