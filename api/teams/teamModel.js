const db = require('../../data/dbConfig');
const Treeize = require('treeize');
module.exports = {
	countMembersForTeam,
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

async function countMembersForTeam(team_id) {
	let [{ count }] = await db('TeamMembers')
		.where({ 'TeamMembers.team_id': team_id })
		.count('*');
	count = Number(count);
	return count;
}

async function getAllTeamsForAnOrg(org_id) {
	const teams = await db('Teams')
		.join('TeamMembers', 'Teams.id', 'TeamMembers.team_id')
		.join('Users', 'TeamMembers.user_id', 'Users.id')
		.where('Teams.org_id', org_id)
		.andWhere('TeamMembers.team_role', 'ilike', 'manager')
		.select(
			'Teams.id as team_id ',
			'Teams.name',

			'TeamMembers.id as managers:member_id',
			'Users.id as managers:user_id*',
			'Users.first_name as managers:first_name',
			'Users.last_name as managers:last_name',
		)
		.groupBy('TeamMembers.id', 'Teams.id', 'Users.id');

	const data = await Promise.all(
		teams.map(async team => {
			const count = await countMembersForTeam(team.team_id);
			return {
				...team,
				count,
			};
		}),
	);

	const teamAgg = new Treeize();
	teamAgg.grow(data);
	return teamAgg.getData();
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

function editTeam(id, changes) {
	return db('Teams')
		.where({ id })
		.update(changes)
		.then(() => getTeamById(id));
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

function editTeamMember(id, changes) {
	return db('TeamMembers')
		.where({ id })
		.update(changes)
		.then(() => getTeamMemberById(id));
}

async function deleteTeamMember(id) {
	await db('TeamMembers')
		.where({ id: id })
		.del();
}
