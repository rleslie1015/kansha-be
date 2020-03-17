const Team = require('./teamModel');
const TeamMembers = require('./teamMembersModel');
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

router.post('/:id', async (req, res) => {
	const { team_role, user_id } = req.body;

	if (!team_role) {
		return res.status(400).json({ error: 'member needs a role' });
	}

	try {
		const newTeamMember = await TeamMembers.AddTeamMemberToTeam({
			team_role,
			user_id,
			team_id: req.params.id,
		});
		return res.status(201).json(newTeamMember);
	} catch (error) {
		console.log('error creating member', error);
		res.status(500).json({ error: 'Error adding member' });
	}
});

//delete a team
router.delete('/:id', (req, res) => {});
//update team
router.put('/:id', (req, res) => {});

module.exports = router;
