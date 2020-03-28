const Comments = require('./reactionModel');
const { emitterInput } = require('../livefeed/liveFeedEmitter');
const router = require('express').Router();

router.get('/:rec_id', async (req, res) => {
	const { rec_id } = req.params;
	try {
		const comments = await Comments.getComments(rec_id);
		if (comments) {
			res.status(200).json(comments);
		} else {
			res.status(404).json({ message: 'post not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const [comment] = await Comments.addComment({
			user_id: req.profile.id,
			...req.body,
		});
		emitterInput.emit('event', {
			payload: comment,
			type: 'FEED_EVENT_NEW_COMMENT',
			org_name: req.profile.org_name,
		});
		res.status(201).json(comment);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const { rec_id } = req.query;
	try {
		await Comments.deleteEvent('Comments', id);
		emitterInput.emit('event', {
			payload: { id, rec_id },
			type: 'FEED_EVENT_REMOVE_COMMENT',
			org_name: req.profile.org_name,
		});
		res.sendStatus(204);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
