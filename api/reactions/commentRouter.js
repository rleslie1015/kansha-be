const dbModel = require('./reactionModel');
const { emitterInput } = require('../livefeed/liveFeedEmitter');

const router = require('express').Router();
router.get('/:rec_id', (req, res) => {
	const { rec_id } = req.params;

	dbModel
		.getComments(rec_id)
		.then(comments => {
			if (!comments) {
				res.status(404).json({ message: 'post not found' });
			} else {
				res.status(200).json(comments);
			}
		})
		.catch(err => {
			console.error(err);
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	dbModel
		.addComment({ user_id: req.profile.id, ...req.body })
		.then(([comment]) => {
			emitterInput.emit('event', {
				payload: comment,
				type: 'FEED_EVENT_NEW_COMMENT',
				org_name: req.profile.org_name,
			});
			res.status(201).json(comment);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const { rec_id } = req.query;
	dbModel
		.deleteEvent('Comments', id)
		.then(() => {
			emitterInput.emit('event', {
				payload: { id, rec_id },
				type: 'FEED_EVENT_REMOVE_COMMENT',
				org_name: req.profile.org_name,
			});
			res.sendStatus(204);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json(err);
		});
});

module.exports = router;
