const db = require('../../data/dbConfig');

module.exports = {
	getAllTeamMembersForATeam,
	getTeamMemberById,
	AddTeamMemberToTeam,
	EditTeamMember,
	DeleteTeamMember,
};

function getAllTeamMembersForATeam() {
	return db('TeamMembers');
}

function getTeamMemberById(id) {
	return db('TeamMembers')
		.where({ id })
		.first();
}

async function AddTeamMemberToTeam(teamMember) {
	const [id] = await db('TeamMembers').insert(teamMember, 'id');

	return getTeamMemberById(id);
}

function EditTeamMember() {
	return db('TeamMembers');
}

function DeleteTeamMember() {
	return db('TeamMembers');
}
