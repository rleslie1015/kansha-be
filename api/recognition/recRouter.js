const router = require('express').Router();
const dbModel = require('./recModel');
const { emitterInput } = require('../livefeed/liveFeedEmitter')

router.get('/', (req, res) => {
	dbModel
		.findAll()
		.then(post => {
			res.status(200).json(post);
		})
		.catch(err => {
			res.status(500).json(err.message);
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	dbModel
		.findById(id)
		.then(post => {
			if (!post) {
				res.status(404).json({ message: 'post not found' });
			} else {
				res.status(200).json(post);
			}
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	const { body } = req;
	dbModel
		.addRec(body)
		.then(([rec]) => {
            emitterInput.emit('event', {
				payload: rec,
                type: 'FEED_EVENT_NEW_REC',
                org_name: req.profile.org_name
			});
			res.status(201).json(rec);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	emitterInput.emit('event', {
		payload: {id},
		type: 'FEED_EVENT_REMOVE_REC',
		org_name: req.profile.org_name
	});
	dbModel
		.deleteRec(id)
		.then(() => res.sendStatus(204))
		.catch(err => {
			res.status(500).json(err);
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { body } = req;

	dbModel
		.editRec(id, body)
		.then(post => {
			res.status(200).json(body);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});



module.exports = router;
