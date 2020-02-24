const router = require('express').Router();
const Orgs = require('./organizationModel.js');
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

router.get('/', (req, res) => {
	Orgs.findAllOrgs()
		.then(orgs => {
			res.status(200).json(orgs);
		})
		.catch(err => {
			console.log('error getting all orgs', err);
			res.status(500).end();
		});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	Orgs.findOrgById(id)
		.then(org => {
			res.status(200).json(org);
		})
		.catch(err => {
			console.log('error getting org', err);
			res.status(500).json({ error: 'Error getting org' });
		});
});

router.post('/', (req, res) => {
	Orgs.addOrg(req)
		.then(org => {
			res.status(201).json(org);
		})
		.catch(err => {
			console.log('Error creatign org', err);
			res.status(500).json({ error: 'Error creatign Org' });
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Orgs.deleteOrg(id).then(org => {
		res.status(200).json(org);
	})(err => {
		onsole.log('error deleting Org', err);
		res.status(500).json({ error: 'Error Deleting org' });
	});
});

module.exports = router;
