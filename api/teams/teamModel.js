const db = require('../../data/dbConfig');

module.exports = {
	getAllTeamsForAnOrg,
	getTeamById,
	AddTeamToOrg,
	EditTeam,
	DeleteTeam,
};

function getAllTeamsForAnOrg(org_id) {
	return db('Teams')
		.join('TeamMembers', 'Teams.id', 'TeamMembers.team_id')
		.join('Users', 'TeamMembers.user_id', 'Users.id')
		.count('TeamMembers.id as team_count')
		.where('Teams.org_id', org_id)
		.andWhere('TeamMembers.team_role', 'ilike', 'manager')
		.select(
			'Teams.id',
			'name',
			'Users.id as user_id',
			'Users.first_name',
			'Users.last_name',
		);
}

function getTeamById(id) {
	return db('Teams')
		.where({ id })
		.first();
}

async function AddTeamToOrg(team) {
	const [id] = await db('Teams').insert(team, 'id');

	return getTeamById(id);
}

function EditTeam() {
	return db('Teams');
}

function DeleteTeam() {
	return db('Teams');
}
