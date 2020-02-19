const db = require('../../data/dbConfig');

function getOrgRecognitions(org_name) {
	return db('Recognition as r')
		.select(
			's.*',
			'r.*',
			'o.name as org_name',
			'u.last_name as recipient_last',
			'u.first_name as recipient_first',
			'u.profile_picture as recipient_picture',
		)
		.join('Organizations as o', 'o.id', 'r.org_id')
		.join('Users as s', 'r.sender', '=', 's.id')
		.join('Users as u ', 'r.recipient', '=', 'u.id')
		.where('o.name', org_name)
		.orderBy('r.date', 'desc')
		.limit(25);
}

module.exports = {
	getOrgRecognitions,
};
