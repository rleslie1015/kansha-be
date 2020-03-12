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
	return db('Organizations')
		.where({ id })
		.first();
}

// create an organization
async function addOrg(org) {
	const [id] = await db('Organizations').insert(org, 'id');
	return findOrgById(id);
}

// delete an organization

async function deleteOrg(id) {
	await db('Recognition')
		.where({ org_id: id })
		.del();
	await db('Employees')
		.where({ org_id: id })
		.del();
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
