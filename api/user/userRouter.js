const router = require('express').Router();
const dbModel = require('./userModel');
const auth = require;

router.get('/', (req, res) => {
	dbModel
		.findAll()
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			res.status(500).json(err.message);
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	dbModel
		.findById(id)
		.then(user => {
			if (!user) {
				res.status(404).json({ message: 'User not found' });
			} else {
				res.status(200).json(user);
			}
		})
		.catch(err => {
			res.status(500).json(err.toString());
		});
});

router.post('/', (req, res) => {
	const { body, user } = req;
	body.sub = user.sub;
	if (user.picture) {
		body.profile_picture = user.picture;
	}
	dbModel
		.addUser(body)
		.then(newUser => {
			res.status(201).json(newUser);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	dbModel
		.deleteUser(id)
		.then(() => res.sendStatus(204))
		.catch(err => {
			res.status(500).json(err);
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { body } = req;

	dbModel
		.editUser(id, body)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
