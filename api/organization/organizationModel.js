const db = require('../../data/dbConfig');

module.exports = {
	findOrgById,
	findAllOrgs,
	addOrg,
	deleteOrg,
	editOrg,
};

function findAllOrgs() {
	return db('Organizations').select('id', 'name');
}

// get information about one organization
function findOrgById(id) {
	return db('Organizations').where({ id });
}

// create an organization
async function addOrg(org) {
	const [id] = await db('Organizations').insert(org);

	return findOrgById(id);
}

// delete an organizaiton

function deleteOrg(id) {
	return db('Organizations')
		.where({ id })
		.del();
}

// edit an organization

function editOrg(id, changes) {
	return db('Organizations')
		.where({ id })
		.update(changes)
		.then(count => (count > 0 ? findOrgById(id) : null));
}
