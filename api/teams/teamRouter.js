const Team = require('./teamModel');
const router = require('express').Router();
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

// get all teams for an organization
router.get('/', (req, res) => {
	Team.getAllTeamsForAnOrg(req.profile.org_id)
		.then(teams => {
			res.status(200).json(teams);
		})
		.catch(error => {
			console.error(error);
			res.status(500).json({
				error: 'Teams could not be retrieved from the database',
			});
		});
});

//get a team by id with members
router.get('/:id', (req, res) => {
	Team.getTeamByIdWithMembers(req.params.id)
		.then(team => {
			res.status(200).json(team);
		})
		.catch(error => {
			console.error(error);
			res.status(500).json({
				error: 'Team could not be retrieved from the database',
			});
		});
});

// Add new team with team members
router.post('/', async (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({ error: 'Team needs a name' });
	}

	try {
		let newTeam = await Team.addTeamToOrg({
			name: req.body.name,
			org_id: req.profile.org_id,
		});
		let counter = 0;

		for (const newMember of req.body.newMembersArray) {
			if (newMember.user_id && newMember.team_role) {
				await Team.addTeamMemberToTeam({
					team_role: newMember.team_role,
					user_id: newMember.user_id,
					team_id: newTeam.id,
				});

				counter++;
			}
		}
		res.status(201).json({
			id: newTeam.id,
			message: `Successfully added ${counter} members to team  ${newTeam.name}! `,
		});
	} catch (error) {
		console.error('error creating team', error);
		res.status(500).json({ error: 'Error adding team' });
	}
});

// Add team member to team
router.post('/:id', async (req, res) => {
	if (!req.body.team_role) {
		return res.status(400).json({ error: 'member needs a role' });
	}

	try {
		const newTeamMember = await Team.addTeamMemberToTeam({
			team_role: req.body.team_role,
			user_id: req.body.user_id,
			team_id: req.params.id,
		});
		return res.status(201).json(newTeamMember);
	} catch (error) {
		console.error('error creating member', error);
		res.status(500).json({ error: 'Error adding member' });
	}
});

//delete a team
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Team.deleteTeam(id)
		.then(() => {
			res.sendStatus(204);
		})
		.catch(error => {
			console.error('error deleting team', error);
			res.status(500).json({
				error: 'Error Deleting team',
			});
		});
});

//update team
router.put('/:id', (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({ error: 'Team needs a name' });
	}
	Team.editTeam(req.params.id, req.body)
		.then(updateTeam => {
			res.status(200).json(updateTeam);
		})
		.catch(error => {
			console.error(error);
			res.status(500).json({
				error: 'Failed to update Team',
			});
		});
});

//get a team-member by id
router.get('/members/:id', (req, res) => {
	Team.getTeamMemberById(req.params.id)
		.then(member => {
			res.status(200).json(member);
		})
		.catch(error => {
			console.error(error);
			res.status(500).json({
				error: 'Member could not be retrieved from the database',
			});
		});
});

//delete a team-member
router.delete('/members/:id', (req, res) => {
	Team.deleteTeamMember(req.params.id)
		.then(() => {
			res.sendStatus(204);
		})
		.catch(error => {
			console.error('error deleting team member', error);
			res.status(500).json({
				error: 'Error Deleting team member',
			});
		});
});

//update team-member
router.put('/members/:id', (req, res) => {
	if (!req.body.team_role) {
		return res.status(400).json({ error: 'Team member needs a role' });
	}

	Team.editTeamMember(req.params.id, req.body)
		.then(updateMember => {
			res.status(200).json(updateMember);
		})
		.catch(error => {
			console.error(error);
			res.status(500).json({
				error: 'Failed to update Team Member',
			});
		});
});

module.exports = router;
