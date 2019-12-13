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

	const composeListener = (name) => data => {
		res.write(`event: ${name}\n`);
		res.write(`data: ${JSON.stringify(data)}\n\n`);
	}

	const recListener = composeListener('recognition')

	feedEmitter.on(`recognition-${req.profile.org_name}`, recListener)

	res.on('close', () => {
		feedEmitter.removeListener(`recognition-${req.profile.org_name}`, recListener)
	})
});

module.exports = router