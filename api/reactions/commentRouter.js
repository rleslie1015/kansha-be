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
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	dbModel
		.addComment(type, { user_id: req.profile.id, ...req.body })
		.then(([comment]) => {
			emitterInput.emit('event', {
				payload: comment,
				type: 'FEED_EVENT_NEW_COMMENT',
				org_name: req.profile.org_name,
			});
			res.status(201).json(comment);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	dbModel
		.deleteEvent(type, id)
		.then(() => res.sendStatus(204))
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
