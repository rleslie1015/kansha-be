const router = require('express').Router();
const Orgs = require('./organizationModel.js');
const auth = require('../../middleware/authMiddleWare');
const emp = require('../employee/employeeModel');

router.use(auth.validateId);

// get all orgs
router.get('/', async (req, res) => {
	try {
		const orgs = await Orgs.findAllOrgs();
		res.status(200).json(orgs);
	} catch (err) {
		console.error('error getting all orgs', err);
		res.status(500).end();
	}
});

// get one org
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const org = await Orgs.findOrgById(id);
		res.status(200).json(org);
	} catch (err) {
		console.error('error getting org', err);
		res.status(500).json({ error: 'Error getting org' });
	}
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
			await emp.addEmployee({
				user_id: id,
				org_id,
				user_type,
				job_title,
			});
			return res.status(201).json({ org_id });
		}
		res.status(406).json({ error: 'You are not logged in' });
	} catch (error) {
		console.error('error creating organization', error);
		res.status(500).json({ error: 'Error adding organization' });
	}
});

// delete an org
router.delete('/:id', validateOrgId, async (req, res) => {
	const { id } = req.params;
	try {
		await Orgs.deleteOrg(id);
		res.sendStatus(204);
	} catch (error) {
		console.error('error deleting Org', error);
		res.status(500).json({
			error: 'Error Deleting org',
		});
	}
});

// edit an org
router.put('/:id', validateOrgId, async (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	try {
		const org = await Orgs.editOrg(id, changes);
		res.status(200).json(org);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Failed to update the organization',
		});
	}
});

// Middleware

async function validateOrgId(req, res, next) {
	const orgId = Number(req.profile.org_id);
	const paramId = Number(req.params.id);
	if (orgId === paramId) {
		try {
			const org = await Orgs.findOrgById(orgId);
			if (org) {
				req.org = org;
				next();
			} else {
				res.status(404).json({
					error: 'there is no org with that id',
				});
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({
				message: 'Error validating organziation id',
			});
		}
	} else {
		res.sendStatus(406);
	}
}

module.exports = router;
