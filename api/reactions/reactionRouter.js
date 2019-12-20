const dbModel = require('./reactionModel');
const { emitterInput } = require('../livefeed/liveFeedEmitter');

const router = require('express').Router();
router.get('/:rec_id', (req, res) => {
	const { rec_id } = req.params;

	dbModel
		.getReactions(rec_id)
		.then(reactions => {
			if (!reactions) {
				res.status(404).json({ message: 'reactions not found' });
			} else {
				res.status(200).json(reactions);
			}
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	dbModel
		.addReaction( { user_id: req.profile.id, ...req.body })
		.then(([reaction]) => {
			emitterInput.emit('event', {
				payload: reaction,
				type: 'FEED_EVENT_NEW_REACTION',
				org_name: req.profile.org_name
			});
			res.status(201).json(reaction);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const { rec_id } = req.query;
	dbModel
		.deleteEvent('Reactions', id)
		.then(() => {
			emitterInput.emit('event', {
				payload: {id, rec_id},
				type: 'FEED_EVENT_REMOVE_REACTION',
				org_name: req.profile.org_name
			});
			res.sendStatus(204);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
