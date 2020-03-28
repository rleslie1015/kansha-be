const Reactions = require('./reactionModel');
const { emitterInput } = require('../livefeed/liveFeedEmitter');
const router = require('express').Router();

router.get('/:rec_id', async (req, res) => {
	const { rec_id } = req.params;
	try {
		const reactions = await Reactions.getReactions(rec_id);
		if (reactions) {
			res.status(200).json(reactions);
		} else {
			res.status(404).json({ message: 'reactions not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const [reaction] = await Reactions.addReaction({
			user_id: req.profile.id,
			...req.body,
		});
		emitterInput.emit('event', {
			payload: reaction,
			type: 'FEED_EVENT_NEW_REACTION',
			org_name: req.profile.org_name,
		});
		res.status(201).json(reaction);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const { rec_id } = req.query;
	try {
		await Reactions.deleteEvent('Reactions', id);
		emitterInput.emit('event', {
			payload: { id, rec_id },
			type: 'FEED_EVENT_REMOVE_REACTION',
			org_name: req.profile.org_name,
		});
		res.sendStatus(204);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

module.exports = router;
