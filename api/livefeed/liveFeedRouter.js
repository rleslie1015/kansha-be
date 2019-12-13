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
	const commentListener = composeListener('comment')
	const reactionListener = composeListener('reaction')

	feedEmitter.on(`recognition-${req.profile.org_name}`, recListener)
	feedEmitter.on(`comment-${req.profile.org_name}`, commentListener)
	feedEmitter.on(`reaction-${req.profile.org_name}`, reactionListener)

	res.on('close', () => {
		feedEmitter.removeListener(`recognition-${req.profile.org_name}`, recListener)
		feedEmitter.removeListener(`comment-${req.profile.org_name}`, commentListener)
		feedEmitter.removeListener(`reaction-${req.profile.org_name}`, reactionListener)
	})
});

module.exports = router