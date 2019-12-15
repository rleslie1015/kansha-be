
const dbModel = require('./reactionModel');
const { feedEmitter } = require('../livefeed/liveFeedEmitter');

const reactionRouter = type => {
    const router = require('express').Router();
	router.get('/:rec_id', (req, res) => {
		const { rec_id } = req.params;

		if (type === 'Reactions') {
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
		} else if (type === 'Comments') {
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
		} else {
            res.status(404).json({ message: 'not found' });
        }
	});

	router.post('/', (req, res) => {
		dbModel
			.addEvent(type, {user_id: req.profile.id, ...req.body})
			.then(post => {
                feedEmitter.emit(`new${type}`, post)
				res.status(201).json(post);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	});

	router.delete('/:id', (req, res) => {
		const { id } = req.params;
		dbModel
			.deleteEvent(type ,id)
			.then(() => res.sendStatus(204))
			.catch(err => {
				res.status(500).json(err);
			});
	});

	/* router.put('/:id', (req, res) => {
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
    }); */
    return router
};

module.exports = reactionRouter;
