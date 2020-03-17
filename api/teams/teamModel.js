const db = require('../../data/dbConfig');
const Treeize = require('treeize');
module.exports = {
	getAllTeamsForAnOrg,
	getTeamById,
	AddTeamToOrg,
	EditTeam,
	DeleteTeam,
	getTeamByIdWithMembers,
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

async function getTeamByIdWithMembers(id) {
	const team = await db('Teams')
		.join('TeamMembers', 'Teams.id', 'TeamMembers.team_id')
		.join('Users', 'TeamMembers.user_id', 'Users.id')
		.select(
			'Teams.id',
			'Teams.name',
			'Users.id as team_members:user_id',
			'Users.first_name as team_members:first_name',
			'Users.last_name as team_members:last_name',
			'Users.profile_picture as team_members:profile_picture',
		)
		.groupBy('Teams.id', 'TeamMembers.id', 'Users.id')
		.where('Teams.id', id);

	const teamAgg = new Treeize();
	teamAgg.grow(team);
	return teamAgg.getData()[0];
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
