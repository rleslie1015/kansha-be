const db = require('../../data/dbConfig');

module.exports = {
	getAllTeamsForAnOrg,
	getTeamById,
	AddTeamToOrg,
	EditTeam,
	DeleteTeam,
};

function getAllTeamsForAnOrg() {
	return db('Teams');
}

function getTeamById() {
	return db('Teams');
}

function AddTeamToOrg() {
	return db('Teams');
}

function EditTeam() {
	return db('Teams');
}

function DeleteTeam() {
	return db('Teams');
}
