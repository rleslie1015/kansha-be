const db = require('../../data/dbConfig');
const Treeize = require('treeize');
module.exports = {
	getAllTeamsForAnOrg,
	getTeamById,
	addTeamToOrg,
	editTeam,
	deleteTeam,
	getTeamByIdWithMembers,
	getAllTeamMembersForATeam,
	getTeamMemberById,
	addTeamMemberToTeam,
	editTeamMember,
	deleteTeamMember,
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
			'TeamMembers.id as team_members:id',
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
async function addTeamToOrg(team) {
	const [id] = await db('Teams').insert(team, 'id');

	return getTeamById(id);
}

function editTeam() {
	return db('Teams');
}

async function deleteTeam(id) {
	await db('TeamMembers')
		.where({ team_id: id })
		.del();
	await db('Teams')
		.where({ id })
		.del();
}

function getAllTeamMembersForATeam() {
	return db('TeamMembers');
}

function getTeamMemberById(id) {
	return db('TeamMembers')
		.join('Users', 'TeamMembers.user_id', 'Users.id')
		.join('Teams', 'TeamMembers.team_id', 'Teams.id')
		.select(
			'TeamMembers.*',
			'Teams.name as team_name',
			'Users.first_name',
			'Users.last_name',
			'Users.profile_picture',
		)
		.where('TeamMembers.id', id)
		.first();
}

async function addTeamMemberToTeam(teamMember) {
	const [id] = await db('TeamMembers').insert(teamMember, 'id');

	return getTeamMemberById(id);
}

function editTeamMember() {
	return db('TeamMembers');
}

async function deleteTeamMember(id) {
	await db('TeamMembers')
		.where({ id: id })
		.del();
}
