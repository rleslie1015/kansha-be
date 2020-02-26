const db = require('../../data/dbConfig');

function getOrgRecognitions(org_id) {
	return db('Recognition as r')
		.select(
			's.*',
			'r.*',
			'o.name as org_name',
			'o.id as org_id',
			'u.last_name as recipient_last',
			'u.first_name as recipient_first',
			'u.profile_picture as recipient_picture',
		)
		.join('Organizations as o', 'o.id', 'r.org_id')
		.join('Users as s', 'r.sender', 's.id')
		.join('Users as u ', 'r.recipient', 'u.id')
		.where('o.id', org_id)
		.orderBy('r.date', 'desc')
		.limit(25);
}

module.exports = {
	getOrgRecognitions,
};
