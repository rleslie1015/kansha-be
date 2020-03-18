const Team = require('./teamModel');
const router = require('express').Router();
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

// get all teams for an organization
router.get('/', (req, res) => {
	const currentOrgId = req.profile.org_id;
});

//get a team by id with members
router.get('/:id', (req, res) => {
	const id = req.params.id;

	Team.getTeamByIdWithMembers(id)
		.then(team => {
			res.status(200).json(team);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Team could not be retrieved from the database',
			});
		});
});

//add a team  to a organization
router.post('/', async (req, res) => {
	const currentOrgId = req.profile.org_id;
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ error: 'Team needs a name' });
	}

	try {
		const newTeam = await Team.addTeamToOrg({
			name,
			org_id: currentOrgId,
		});
		return res.status(201).json(newTeam);
	} catch (error) {
		console.log('error creating team', error);
		res.status(500).json({ error: 'Error adding team' });
	}
});
// Add team member to team
router.post('/:id', async (req, res) => {
	const { team_role, user_id } = req.body;

	if (!team_role) {
		return res.status(400).json({ error: 'member needs a role' });
	}

	try {
		const newTeamMember = await Team.addTeamMemberToTeam({
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
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Team.deleteTeam(id)
		.then(team => {
			res.status(204).json({
				message: 'Successfully deleted team',
			});
		})
		.catch(error => {
			console.log('error deleting team', error);
			res.status(500).json({
				error: 'Error Deleting team',
			});
		});
});

//update team
router.put('/:id', (req, res) => {});

//get a team-member by id
router.get('/members/:id', (req, res) => {
	const id = req.params.id;

	Team.getTeamMemberById(id)
		.then(member => {
			res.status(200).json(member);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Member could not be retrieved from the database',
			});
		});
});

//delete a team-member
router.delete('/members/:id', (req, res) => {
	const id = req.params.id;
	Team.deleteTeamMember(id)
		.then(() => {
			res.status(204).json({
				message: 'Successfully deleted team member',
			});
		})
		.catch(error => {
			console.log('error deleting team member', error);
			res.status(500).json({
				error: 'Error Deleting team member',
			});
		});
});

//update team-member
router.put('/members/:id', (req, res) => {});

module.exports = router;
