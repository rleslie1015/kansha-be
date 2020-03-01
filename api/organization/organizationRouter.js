const router = require('express').Router();
const Orgs = require('./organizationModel.js');
const auth = require('../../middleware/authMiddleWare');
const emp = require('../employee/employeeModel');

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
router.post('/', async (req, res) => {
	const { id, user_type, job_title } = req.profile;
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ error: 'Organization needs a name' });
	}

	try {
		let { id: org_id } = await Orgs.addOrg(req.body);
		if (id) {
			const newEmployee = await emp.addEmployee({
				user_id: id,
				org_id,
				user_type,
				job_title,
			});
			res.status(201).json({ org_id });
		}
		res.status(406).json({ error: 'You are not logged in' });
	} catch (error) {
		console.log('error creating organization', error);
		res.status(500).json({ error: 'Error adding organization' });
	}
});

// delete an org
router.delete('/:id', validateOrgId, (req, res) => {
	const id = req.params.id;
	Orgs.deleteOrg(id)
		.then(org => {
			res.status(204).json({
				message: 'Successfully deleted organization',
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
				error: 'Failed to update the organization',
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
