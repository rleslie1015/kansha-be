const router = require('express').Router();
const Orgs = require('./organizationModel.js');
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

// get all orgs
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
// get one org
router.get('/:id', validateOrgId, (req, res) => {
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
// add an org
router.post('/', (req, res) => {
	// console.log(req.profile, 'req.profile');
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ error: 'Organization needs a name' });
	}
	Orgs.addOrg(req.body)
		.then(org => {
			res.status(201).json({
				mesage: 'Successfully created organization',
			});
		})
		.catch(err => {
			console.log('Error creating org', err);
			res.status(500).json({ error: 'Error creating Org' });
		});
});
// delete an org
router.delete('/:id', validateOrgId, (req, res) => {
	const id = req.params.id;
	Orgs.deleteOrg(id)
		.then(org => {
			res.status(204).json({
				response: 'Successfully deleted organization',
			});
		})
		.catch(error => {
			console.log('error deleting Org', error);
			res.status(500).json({
				error: 'Error Deleting org',
			});
		});
});

// edit an org

router.put('/:id', validateOrgId, (req, res) => {
	const id = req.params.id;
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Organization needs a name' });
	}
	const changes = req.body;
	Orgs.editOrg(id, changes)
		.then(updatedOrg => {
			res.status(200).json(updatedOrg);
		})
		.catch(error => {
			res.status(500).json({
				message: 'Failed to update the organization',
			});
		});
});

// Middleware

function validateOrgId(req, res, next) {
	const { id } = req.params;
	Orgs.findOrgById(id).then(org => {
		if (org) {
			req.org = org;
			next();
		} else {
			res.status(404).json({ error: 'there is no org with that id' });
		}
	});
}

module.exports = router;
