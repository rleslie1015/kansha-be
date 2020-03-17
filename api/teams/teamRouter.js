const Team = require('./teamModel');
const router = require('express').Router();
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);
// get all teams for an organization
router.get('/', (req, res) => {});
//get a team by id
router.get('/:id', (req, res) => {});
//add a team  to a organization

router.post('/', async (req, res) => {
	const currentOrgId = req.profile.org_id;
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ error: 'Team needs a name' });
	}

	try {
		const newTeam = await Team.AddTeamToOrg({
			name,
			org_id: currentOrgId,
		});
		return res.status(201).json(newTeam);
	} catch (error) {
		console.log('error creating team', error);
		res.status(500).json({ error: 'Error adding team' });
	}
});

//delete a team
router.delete('/:id', (req, res) => {});
//update team
router.put('/:id', (req, res) => {});

module.exports = router;
