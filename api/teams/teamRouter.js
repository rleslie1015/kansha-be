const Team = require('./teamModel');
const router = require('express').Router();
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

// get all teams for an organization
router.get('/', (req, res) => {
	const currentOrgId = req.profile.org_id;

	Team.getAllTeamsForAnOrg(currentOrgId)
		.then(teams => {
			res.status(200).json(teams);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: 'Teams could not be retrieved from the database',
			});
		});
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

// Add new team with team members
router.post('/', async (req, res) => {
	const currentOrgId = req.profile.org_id;
	const { name, team_role, user_id, newMembersArray } = req.body;

	if (!name) {
		return res.status(400).json({ error: 'Team needs a name' });
	}

	try {
		let newTeam = await Team.addTeamToOrg({
			name,
			org_id: currentOrgId,
		});
		let counter = 0;
		const memberArray = [];
		// console.log(newTeam);

		for (const newMember of newMembersArray) {
			if (newMember['user_id'] && newMember['team_role']) {
				const newTeamMember = await Team.addTeamMemberToTeam({
					team_role: newMember['team_role'],
					user_id: newMember['user_id'],
					team_id: newTeam.id,
				});

				memberArray.push({
					team_id: newMember['team_id'],
				});
				counter++;
			}
		}
		res.status(200).json({
			message: `Successfully added ${counter} members to team  ${newTeam.name}! `,
		});
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
router.put('/:id', (req, res) => {
	const id = req.params.id;

	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ error: 'Team needs a name' });
	}
	const changes = req.body;
	Team.editTeam(id, changes)
		.then(updateTeam => {
			res.status(200).json(updateTeam);
		})
		.catch(error => {
			res.status(500).json({
				error: 'Failed to update Team',
			});
		});
});

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
router.put('/members/:id', (req, res) => {
	const id = req.params.id;

	const { team_role, active } = req.body;

	if (!team_role) {
		return res.status(400).json({ error: 'Team member needs a role' });
	}
	const changes = req.body;
	Team.editTeamMember(id, changes)
		.then(updateMember => {
			res.status(200).json(updateMember);
		})
		.catch(error => {
			res.status(500).json({
				error: 'Failed to update Team Member',
			});
		});
});

module.exports = router;
