const router = require('express').Router();
const dbModel = require('./recModel');
const { emitterInput } = require('../livefeed/liveFeedEmitter');
const { validateId } = require('../../middleware/authMiddleWare');
const emp = require('../employee/employeeModel');

router.get('/', (req, res) => {
	dbModel
		.findAll()
		.then(post => {
			res.status(200).json(post);
		})
		.catch(err => {
			console.error(err);
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
			console.error(err);
			res.status(500).json(err);
		});
});

// Get recognitions by organization ID

router.get('/admin', (req, res) => {
	const orgId = req.profile.org_id;

	emp.getRecByOrg(orgId, req.query)
		.then(e => {
			res.status(200).json(e);
		})
		.catch(error => {
			console.log(error, 'error');
			res.status(500).json({
				error:
					'Recognition List could not be retrieved from the database',
			});
		});
});

router.post('/', (req, res) => {
	const { body, profile } = req;
	const { recipient, sender, message, date, badge_id } = body;
	const { org_id } = profile;
	dbModel
		.addRec({ recipient, sender, message, date, badge_id, org_id })
		.then(([rec]) => {
			emitterInput.emit('event', {
				payload: rec,
				type: 'FEED_EVENT_NEW_REC',
				org_name: req.profile.org_name,
			});
			res.status(201).json(rec);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	emitterInput.emit('event', {
		payload: { id },
		type: 'FEED_EVENT_REMOVE_REC',
		org_name: req.profile.org_name,
	});
	dbModel
		.deleteRec(id)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err);
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
			console.error(err);
			res.status(500).json(err);
		});
});

module.exports = router;
