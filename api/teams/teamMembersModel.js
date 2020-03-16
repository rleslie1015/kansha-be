const db = require('../../data/dbConfig');

module.exports = {
	getAllTeamMembersForATeam,
	getTeamMemberById,
	AddTeamMemberToTeam,
	EditTeamMember,
	DeleteTeamMember,
};

function getAllTeamMembersForATeam() {
	return db('Teams');
}

function getTeamMemberById() {
	return db('Teams');
}

function AddTeamMemberToTeam() {
	return db('Teams');
}

function EditTeamMember() {
	return db('Teams');
}

function DeleteTeamMember() {
	return db('Teams');
}
